const DEFAULT_TIME_ELAPSED = 'Just Now';

export const getTimeElapsed = (date: string) => {
  const referenceTime = new Date(date).getTime();
  const currentTime = new Date().getTime();

  // Get time difference in Milliseconds
  const milliSecsDiff = currentTime - referenceTime;

  // If in future, return Default
  if (milliSecsDiff < 0) {
    return DEFAULT_TIME_ELAPSED;
  }

  // Get time difference as a Date
  const dateDiff = new Date(milliSecsDiff);

  // Years
  const yearsDiff = Math.floor(milliSecsDiff / 1000 / 60 / (60 * 24) / 365);
  if (yearsDiff > 0) {
    return `${yearsDiff} ${yearsDiff > 1 ? 'years' : 'year'} ago`;
  }

  // Months
  const monthsDiff = dateDiff.getUTCMonth();
  if (monthsDiff > 0) {
    return `${monthsDiff} ${monthsDiff > 1 ? 'months' : 'month'} ago`;
  }

  // Days
  const daysDiff = Math.floor(milliSecsDiff / 1000 / 60 / (60 * 24));
  if (daysDiff > 0) {
    return `${daysDiff}D ago`;
  }

  // Hours
  const hoursDiff = dateDiff.getUTCHours();
  if (hoursDiff > 0) {
    return `${hoursDiff}H ago`;
  }

  // Minutes
  const minutesDiff = dateDiff.getUTCMinutes();
  if (minutesDiff > 0) {
    return `${minutesDiff}M ago`;
  }

  // Seconds
  const secondsDiff = dateDiff.getUTCSeconds();
  return `${secondsDiff}S ago`;
};
