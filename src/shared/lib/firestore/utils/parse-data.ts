export const stringifyArray = (array: Tab[]) =>
  array.map((elem) => JSON.stringify(elem));

export const parseArray = (array: string[]) =>
  array.map((elem) => JSON.parse(elem)) as Tab[];
