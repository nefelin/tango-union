export const timeStringFromSeconds = (secondsTotal: number) => {
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = secondsTotal % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};
