/* eslint-disable no-underscore-dangle */

import React from 'react';
import { graphql } from 'shared/api';
import { introspectionFromSchema } from 'graphql';
import { fromIntrospectionQuery } from 'graphql-2-json-schema';
import DocsHeader from '../docs-header/DocsHeader';
import styles from './DocsExplorer.module.scss';

const useRedoSnapshot = <T extends { [key: string]: unknown }>(object: T) => {
  const cursorRef = React.useRef(0);
  const [snapshots, setSnapshots] = React.useState([{ ...object }]);

  return {
    addSnapshot: (value: T) => {
      setSnapshots((prevSnapshots) => [...prevSnapshots, value]);

      cursorRef.current += 1;
    },
    getSnapshot: () => {
      return snapshots[cursorRef.current];
    },
    undoSnapshot: () => {
      if (cursorRef.current - 1 < 0) {
        return null;
      }

      setSnapshots((prevSnapshots) => {
        const undoSnapshots = [...prevSnapshots];
        undoSnapshots.pop();

        return undoSnapshots;
      });

      cursorRef.current -= 1;

      return null;
    },
  };
};

const DocsExplorer = () => {
  const { data } = graphql.useGetSchemaQuery('{}');

  // if (!data) {
  //   return null;
  // }
  const introspection = introspectionFromSchema(data);

  const jsonSchema = fromIntrospectionQuery(introspection, {
    ignoreInternals: true,
    nullableArrayItems: true,
    idTypeMapping: 'string',
  });

  const { addSnapshot, getSnapshot, undoSnapshot } = useRedoSnapshot(
    jsonSchema.properties!
  );

  const snapshot = getSnapshot();

  const handlePropertyClick = (event: React.MouseEvent<HTMLElement>) => {
    const value = (event.target as HTMLElement).innerText;

    addSnapshot(snapshot[value]);
  };

  const handleBack = () => {
    undoSnapshot();
  };

  React.useEffect(() => {
    // console.log(getType(snapshot) ?? snapshot);
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
          continent
        </button>
        <button type="button" onClick={handleBack}>
          back
        </button>
      </div>
    </div>
  );
};

export default DocsExplorer;
