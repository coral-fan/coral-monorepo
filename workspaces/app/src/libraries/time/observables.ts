import { getMilliSecsDiff } from 'libraries/time/utils';
import { concat, interval, map, take, takeLast, takeUntil, timer } from 'rxjs';

// TODO: Update type using generics to avoid any
type TimeRemainingCallback = (milliSecsDiff: number) => any;

const INTERVAL = 1000;

/*
  Solve for timer over 24 days found here:
  https://github.com/ReactiveX/rxjs/issues/3015
*/
export const getBigTimer$ = (timestamp: string, startInterval: number) => {
  /*
    Add startInterval because getTimeRemaining$ interval operator
    does not start immediately, starts after interval.
  */
  const milliSecsDiff = getMilliSecsDiff(timestamp) + startInterval;

  const MAX = 2147483647;

  if (milliSecsDiff > MAX) {
    const numIntervals = Math.floor(milliSecsDiff / MAX);
    const remainder = milliSecsDiff % MAX;
    return concat(timer(MAX, MAX).pipe(take(numIntervals)), timer(remainder)).pipe(takeLast(1));
  }

  return timer(milliSecsDiff);
};

export const getTimeRemaining$ = (timestamp: string, callback: TimeRemainingCallback) =>
  interval(INTERVAL).pipe(
    takeUntil(getBigTimer$(timestamp, INTERVAL)),
    map(() => getMilliSecsDiff(timestamp)),
    map(callback)
  );
