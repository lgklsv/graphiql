export const setLocalStorage = <T>(value: T, key: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  const storageItem = localStorage.getItem(key);
  if (!storageItem) {
    return null;
  }
  return JSON.parse(storageItem);
};

export const removeLocalStorage = (key: string) => {
  const storageItem = localStorage.getItem(key);
  if (!storageItem) {
    return;
  }
  localStorage.removeItem(key);
};
