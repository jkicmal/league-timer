export const MINUTE_IN_MS = 1000 * 60;
export const SECONDS_IN_MS = 1000;
export const getTime = (ms: number): [number, number, number] => {
  const minutes = Math.floor(ms / MINUTE_IN_MS);
  const seconds = Math.floor((ms - minutes * MINUTE_IN_MS) / SECONDS_IN_MS);
  const milliseconds = ms - minutes * MINUTE_IN_MS - seconds * SECONDS_IN_MS;
  return [minutes, seconds, milliseconds];
};
