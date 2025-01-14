export const getWaveNumber = (minutes: number, seconds: number) => {
  if (minutes < 1) return 0;
  let waveNumber = (minutes - 1) * 2;
  if (seconds < 5) return waveNumber;
  if (seconds < 35) return waveNumber + 1;
  return waveNumber + 2;
};

export const getCreepsAtMinute = (minutes: number, seconds: number) => {
  if (minutes < 2) return 0;
  return (minutes - 1) * 9 + Math.floor((9 / 60) * seconds);
};
