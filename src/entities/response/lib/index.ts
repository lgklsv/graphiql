export const getTimingColor = (timing: number): string => {
  let timingColor = 'default';
  if (timing) {
    timingColor = timing > 200 ? 'error' : 'success';
  }
  return timingColor;
};
