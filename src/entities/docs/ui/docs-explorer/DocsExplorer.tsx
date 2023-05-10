/* eslint-disable no-underscore-dangle */

import React from 'react';
import { JSONSchema6, JSONSchema6Definition } from 'json-schema';

import { graphql } from 'shared/api';
import { GraphQLSchema, introspectionFromSchema } from 'graphql';
import { fromIntrospectionQuery } from 'graphql-2-json-schema';
import DocsHeader from '../docs-header/DocsHeader';
import styles from './DocsExplorer.module.scss';
import { useRedoSnapshot } from './hook/use-redo-snapshot';
import { Types } from './ui/Types';
import { handlingSchema } from './utils/handling-schema';
import { removeForbiddenCharacters } from './utils/remove-char';

const DocsExplorer = () => {
  const { data } = graphql.useGetSchemaQuery('{}');
  const [titleData, setTitleData] = React.useState('');

  // if (!data) {
  //   return null;
  // }
  // TODO: check is data?

  const introspection = introspectionFromSchema(data as GraphQLSchema);

  const jsonSchema = fromIntrospectionQuery(introspection, {
    ignoreInternals: true,
    nullableArrayItems: true,
    idTypeMapping: 'string',
  });

  const definitions = jsonSchema.definitions!;

  const { addSnapshot, getSnapshot, undoSnapshot } =
    useRedoSnapshot(jsonSchema);

  const snapshot = getSnapshot();

  const snapshotDefinitions = (value: string) => {
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

    return snapshot?.properties[value]
      ? addSnapshot(snapshot.properties[value] as JSONSchema6)
      : addSnapshot(snapshotDefinitions(value) as JSONSchema6);
  };

  const handleBack = () => {
    undoSnapshot();
    // TODO: сетать предыдущий заголовок
  };

  React.useEffect(() => {
    console.log(snapshot);
  }, [snapshot]);

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
