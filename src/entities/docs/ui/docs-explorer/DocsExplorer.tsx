/* eslint-disable no-underscore-dangle */
import React from 'react';
import { JSONSchema6 } from 'json-schema';
import { graphql } from 'shared/api';
import { GraphQLSchema, introspectionFromSchema } from 'graphql';
import { fromIntrospectionQuery } from 'graphql-2-json-schema';
import DocsHeader from '../docs-header/DocsHeader';
import styles from './DocsExplorer.module.scss';
import { useRedoSnapshot } from './hook/use-redo-snapshot';
import { Types } from './ui/Types';
import { handlingSchema } from './utils/handling-schema';
import { removeForbiddenCharacters } from './utils/remove-char';

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
  const [titleData, setTitleData] = React.useState('');

  const jsonSchema = getJsonSchema(data);

  const { addSnapshot, getSnapshot, undoSnapshot } =
    useRedoSnapshot(jsonSchema);

  const snapshot = getSnapshot();

  if (!jsonSchema) {
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
    setTitleData(value);

    return snapshot?.properties?.[value]
      ? addSnapshot(snapshot.properties[value] as JSONSchema6)
      : addSnapshot(snapshotDefinitions(value) as JSONSchema6);
  };

  const handleBack = () => {
    undoSnapshot();
    // TODO: сетать предыдущий заголовок
  };

  return (
    <div className={styles.docs}>
      <DocsHeader />
      <h2>A GraphQL schema provides a root type for each kind of operation.</h2>
      <h3>{titleData || 'Root Types'}</h3>

      <div className={styles.docs__section_content}>
        {handlingSchema(snapshot).map((dataTypes) => (
          <Types
            info={dataTypes}
            key={dataTypes.name?.title}
            onClick={(event) => {
              handlePropertyClick(event);
            }}
          />
        ))}

        <button type="button" onClick={handlePropertyClick}>
          Query
        </button>

        <button type="button" onClick={handleBack}>
          back
        </button>
      </div>
    </div>
  );
};

export default DocsExplorer;
