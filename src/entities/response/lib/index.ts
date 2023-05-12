export const getTimingColor = (timing: number): string => {
  let timingColor;
  switch (true) {
    case timing <= 200:
      timingColor = 'success';
      break;
    case timing > 1000:
      timingColor = 'error';
      break;
    default:
      timingColor = 'default';
      break;
  }

  return timingColor;
};
