import React from 'react';

export const useRedoSnapshot = <T>(object: T | null) => {
  const cursorRef = React.useRef(0);
  const [snapshots, setSnapshots] = React.useState<T[]>(
    object ? [{ ...object }] : []
  );

  const addSnapshot = React.useCallback((value?: T | null) => {
    if (!value) {
      return null;
    }

    setSnapshots((prevSnapshots) => [...prevSnapshots, value]);

    cursorRef.current += 1;

    return null;
  }, []);

  const getSnapshot = React.useCallback(() => {
    return snapshots[cursorRef.current];
  }, [snapshots]);

  const getPrevSnapshot = React.useCallback(() => {
    if (cursorRef.current - 1 < 0) {
      return null;
    }
    return snapshots[cursorRef.current - 1];
  }, [snapshots]);

  const undoSnapshot = React.useCallback(() => {
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
  }, []);

  const resetSnapshot = React.useCallback((newObject: T | null) => {
    setSnapshots(newObject ? [{ ...newObject }] : []);
    cursorRef.current = 0;
  }, []);

  return {
    addSnapshot,
    getSnapshot,
    getPrevSnapshot,
    undoSnapshot,
    resetSnapshot,
  };
};
