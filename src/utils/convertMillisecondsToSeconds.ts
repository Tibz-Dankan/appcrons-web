export const convertMillisecondsToSeconds = (milliseconds: number): number => {
  const seconds = milliseconds / 1000;
  return parseFloat(seconds.toFixed(2));
};
