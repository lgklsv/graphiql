/* eslint-disable no-underscore-dangle */

import React from 'react';
import { graphql } from 'shared/api';
import { GraphQLSchema, introspectionFromSchema } from 'graphql';
import { fromIntrospectionQuery } from 'graphql-2-json-schema';
import DocsHeader from '../docs-header/DocsHeader';
import styles from './DocsExplorer.module.scss';
import { useRedoSnapshot } from './hook/use-redo-snapshot';
import { getType } from './utils/get-type';

const DocsExplorer = () => {
  const { data } = graphql.useGetSchemaQuery('{}');

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

  const { addSnapshot, getSnapshot, undoSnapshot } = useRedoSnapshot(
    jsonSchema.properties!
  );

  console.log(jsonSchema);

  const snapshot = getSnapshot();

  const handlePropertyClick = (event: React.MouseEvent<HTMLElement>) => {
    const value: string = (event.target as HTMLElement).innerText;

    addSnapshot(snapshot[value]);
  };

  const handleBack = () => {
    undoSnapshot();
  };

  React.useEffect(() => {
    console.log(snapshot);
    console.log(getType(snapshot) ?? snapshot);
  }, [snapshot]);

  return (
    <div className={styles.docs}>
      <DocsHeader />
      <h2>A GraphQL schema provides a root type for each kind of operation.</h2>
      <h3>Root Types</h3>

      <div className={styles.docs__section_content}>
        {/* graphiql-doc-explorer-section-content */}
        {/* {parseData?.map((info) => (
          <Types
            info={info}
            key={info[0]}
            onClick={(event) => handlerClick(event)}
          />
        ))} */}
        <button type="button" onClick={handlePropertyClick}>
          Query
        </button>
        <button
          type="button"
          onClick={(event) => {
            const value = (event.target as HTMLElement).innerText;

            addSnapshot(snapshot.properties[value]);
          }}
        >
          users_by_pk
        </button>
        <button type="button" onClick={handleBack}>
          back
        </button>
      </div>
    </div>
  );
};

export default DocsExplorer;
