import { concat, take, takeLast, timer } from 'rxjs';

const getMilliSecsDiff = (timestamp: string) => {
  const referenceTime = new Date(timestamp).getTime();
  const currentTime = new Date().getTime();

  return referenceTime - currentTime;
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

  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();

  return `${month} ${day}`;
};

export const getTimeString = (timestamp: string) => {
  const date = new Date(timestamp);

  return date
    .toLocaleTimeString('en-US', {
      hour: 'numeric',
      timeZoneName: 'short',
    })
    .replace(' ', '');
};

/*
  Solve for timer over 24 days found here:
  https://github.com/ReactiveX/rxjs/issues/3015
*/
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
