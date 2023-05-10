import React from 'react';
import { JSONSchema6 } from 'json-schema';

export const useRedoSnapshot = <
  T extends { [key: string]: unknown } | JSONSchema6
>(
  object: T
) => {
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
