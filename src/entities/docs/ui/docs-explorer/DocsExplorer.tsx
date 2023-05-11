/* eslint-disable no-underscore-dangle */
import React from 'react';
import { JSONSchema6 } from 'json-schema';
import { Button } from 'antd';

import { LeftOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { graphql } from 'shared/api';
import { GraphQLSchema, introspectionFromSchema } from 'graphql';
import { fromIntrospectionQuery } from 'graphql-2-json-schema';
import DocsHeader from '../docs-header/DocsHeader';
import styles from './DocsExplorer.module.scss';
import { useRedoSnapshot } from './hook/use-redo-snapshot';
import { Types } from './ui/Types';
import { handlingSchema, removeForbiddenCharacters } from './utils';

const getJsonSchema = (data?: GraphQLSchema) => {
  if (!data) {
    return null;
  }

  const introspection = introspectionFromSchema(data);

  const jsonSchema = fromIntrospectionQuery(introspection, {
    ignoreInternals: true,
    nullableArrayItems: true,
    idTypeMapping: 'string',
  });

  return jsonSchema;
};

const DocsExplorer = () => {
  const { data } = graphql.useGetSchemaQuery('{}');

  const jsonSchema = getJsonSchema(data);

  const { addSnapshot, getSnapshot, undoSnapshot, getPrevSnapshot } =
    useRedoSnapshot({
      title: '',
      snapshot: jsonSchema,
    });

  const { snapshot, title } = getSnapshot();

  console.log(jsonSchema);

  const prevTitle = getPrevSnapshot()?.title;

  if (!jsonSchema || !snapshot) {
    return null;
  }

  const { definitions } = jsonSchema;

  const snapshotDefinitions = (value: string) => {
    if (!definitions) {
      return null;
    }

    if (value in definitions) {
      return definitions[value];
    }

    return null;
  };

  const handlePropertyClick = (event: React.MouseEvent<HTMLElement>) => {
    const value: string = removeForbiddenCharacters(
      (event.target as HTMLElement).innerText
    );

    return snapshot?.properties?.[value]
      ? addSnapshot({
          snapshot: snapshot.properties[value] as JSONSchema6,
          title: value,
        })
      : addSnapshot({
          snapshot: snapshotDefinitions(value) as JSONSchema6,
          title: value,
        });
  };

  const handleBack = () => {
    undoSnapshot();
  };

  return (
    <div className={styles.docs}>
      {title && (
        <Button
          type="link"
          htmlType="submit"
          size="large"
          icon={<LeftOutlined />}
          onClick={handleBack}
        >
          {!prevTitle ? 'Doc' : prevTitle}
        </Button>
        // TODO: edit button
      )}

      {!title && <DocsHeader />}

      {!title && (
        <h3>
          A GraphQL schema provides a root type for each kind of operation.
        </h3>
      )}

      <div>
        <MinusCircleOutlined /> {!title ? 'Root type' : 'Field type'}
      </div>
      {/*  - root */}
      {/* <MinusSquareOutlined /> */}

      <h3>{title}</h3>

      <div className={styles.docs__section_content}>
        {handlingSchema(snapshot, title).map((dataTypes) => (
          <Types
            info={dataTypes}
            key={dataTypes.name?.title}
            onClick={(event) => {
              handlePropertyClick(event);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default DocsExplorer;
