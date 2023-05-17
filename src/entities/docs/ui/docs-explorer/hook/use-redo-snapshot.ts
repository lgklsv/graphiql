/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { GraphQLSchema } from 'graphql';

export const useRedoSnapshot = <T>(
  object: T | null,
  schema: GraphQLSchema | undefined
) => {
  const cursorRef = React.useRef(0);
  const [snapshots, setSnapshots] = React.useState<T[]>(
    object ? [{ ...object }] : []
  );

  React.useEffect(() => {
    setSnapshots(object ? [{ ...object }] : []);
    cursorRef.current = 0;
  }, [schema]);

  return {
    addSnapshot: (value?: T | null) => {
      if (!value) {
        return null;
      }

      setSnapshots((prevSnapshots) => [...prevSnapshots, value]);

      cursorRef.current += 1;

      return null;
    },
    getSnapshot: () => {
      return snapshots[cursorRef.current];
    },

    getPrevSnapshot: () => {
      if (cursorRef.current - 1 < 0) {
        return null;
      }
      return snapshots[cursorRef.current - 1];
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
