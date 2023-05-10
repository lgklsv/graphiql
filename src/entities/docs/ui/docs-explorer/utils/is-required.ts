export const isRequired = (key: string, array?: string[]) => {
  if (!array || !array.length) {
    return false;
  }

  return array.includes(key);
};

export const isAlreadyRequired = (string: string, isReq: boolean) => {
  if (isReq && string.slice(-1) !== '!') {
    return `${string}!`;
  }
  return string;
};
