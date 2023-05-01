import { useState, useLayoutEffect, useCallback } from 'react';
import { IMatchMedia } from 'shared/lib/types';

const mediaQueries = [
  '(max-width: 766px)',
  '(min-width: 767px) and (max-width: 1199px)',
  '(min-width: 1200px)',
];

export const useMatchMedia = () => {
  const mediaQueryLists = mediaQueries.map((query) => matchMedia(query));
  const getValues = useCallback(
    () => mediaQueryLists.map((list) => list.matches),
    [mediaQueryLists]
  );

  const [values, setValues] = useState(getValues);

  useLayoutEffect(() => {
    const handler = () => setValues(getValues);

    mediaQueryLists.forEach((list) => list.addEventListener('change', handler));

    return () =>
      mediaQueryLists.forEach((list) =>
        list.removeEventListener('change', handler)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ['isMobile', 'isTablet', 'isDesktop'].reduce(
    (acc, screen, index) => ({
      ...acc,
      [screen]: values[index],
    }),
    {} as IMatchMedia
  );
};

export default useMatchMedia;
