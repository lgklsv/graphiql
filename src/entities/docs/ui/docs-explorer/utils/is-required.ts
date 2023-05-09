export const isRequired = (key: string, array?: string[]) => {
  if (!array || !array.length) {
    return false;
  }

  return array.includes(key);
};
