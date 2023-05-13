/* eslint-disable @typescript-eslint/ban-types */
import { DEBOUNCE_DELAY } from 'app/config';

export const debounce = (fn: Function, delay = DEBOUNCE_DELAY) => {
  let timeoutId: NodeJS.Timer;
  return (...args: unknown[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
