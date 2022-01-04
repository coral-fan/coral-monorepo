export const getTimeDifference = (date: string) => {
  const referenceTime = new Date(date).getTime();
  const currentTime = new Date().getTime();

  // Get time difference in Milliseconds
  let milliSecsDiff;
  if (referenceTime > currentTime) {
    milliSecsDiff = referenceTime - currentTime;
  } else {
    milliSecsDiff = currentTime - referenceTime;
  }

  // Get time difference as a Date
  const dateDiff = new Date(milliSecsDiff);

  // Get time difference in Days
  const daysDiff = Math.floor(milliSecsDiff / 1000 / 60 / (60 * 24));

  // Get time difference in Years
  const yearsDiff = Math.floor(milliSecsDiff / 1000 / 60 / (60 * 24) / 365);

  // Parse dateDiff to get difference in Months, Hours, Minutes, Seconds
  const monthsDiff = new Date(dateDiff).getUTCMonth();
  const hoursDiff = new Date(dateDiff).getUTCHours();
  const minutesDiff = new Date(dateDiff).getUTCMinutes();
  const secondsDiff = new Date(dateDiff).getUTCSeconds();

  return { yearsDiff, monthsDiff, daysDiff, hoursDiff, minutesDiff, secondsDiff };
};
