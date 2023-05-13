import React from 'react';

export const useRedoSnapshot = <T>(object: T | null) => {
  const cursorRef = React.useRef(0);
  const [snapshots, setSnapshots] = React.useState<T[]>(
    object ? [{ ...object }] : []
  );

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
