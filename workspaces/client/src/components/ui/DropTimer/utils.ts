import { concat, take, takeLast, timer } from 'rxjs';

const getMilliSecsDiff = (timestamp: string) => {
  const referenceTime = new Date(timestamp).getTime();
  const currentTime = new Date().getTime();

  return referenceTime - currentTime;
};

const getOrdinal = (day: number) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const getTimeRemaining = (timestamp: string) => {
  const milliSecsDiff = getMilliSecsDiff(timestamp);

  // Return zeroes if in past
  if (milliSecsDiff < 0) {
    return { daysDiff: 0, hoursDiff: 0, minutesDiff: 0, secondsDiff: 0 };
  }

  const dateDiff = new Date(milliSecsDiff);

  const daysDiff = Math.floor(milliSecsDiff / 1000 / 60 / (60 * 24));
  const hoursDiff = dateDiff.getUTCHours();
  const minutesDiff = dateDiff.getUTCMinutes();
  const secondsDiff = dateDiff.getUTCSeconds();

  return { daysDiff, hoursDiff, minutesDiff, secondsDiff };
};

export const getDateString = (timestamp: string) => {
  const date = new Date(timestamp);

  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.getDate();

  return `${month} ${day}${getOrdinal(day)}`;
};

export const getDateStringShort = (timestamp: string) => {
  const date = new Date(timestamp);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${month}/${day}`;
};

export const getTimeString = (timestamp: string) => {
  const date = new Date(timestamp);

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
};

export const bigTimer = (timestamp: string) => {
  const milliSecsDiff = getMilliSecsDiff(timestamp);

  const MAX = 2147483647;

  if (milliSecsDiff > MAX) {
    const numIntervals = Math.floor(milliSecsDiff / MAX);
    const remainder = milliSecsDiff % MAX;
    return concat(timer(MAX, MAX).pipe(take(numIntervals)), timer(remainder)).pipe(takeLast(1));
  }

  return timer(milliSecsDiff);
};
