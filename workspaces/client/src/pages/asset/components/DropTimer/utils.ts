export const getTimeRemaining = (date: string) => {
  const referenceTime = new Date(date).getTime();
  const currentTime = new Date().getTime();

  const milliSecsDiff = referenceTime - currentTime;
  const dateDiff = new Date(milliSecsDiff);

  const daysDiff = Math.floor(milliSecsDiff / 1000 / 60 / (60 * 24));
  const hoursDiff = dateDiff.getUTCHours();
  const minutesDiff = dateDiff.getUTCMinutes();
  const secondsDiff = dateDiff.getUTCSeconds();

  return { daysDiff, hoursDiff, minutesDiff, secondsDiff };
};
