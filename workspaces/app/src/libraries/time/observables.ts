import { getMilliSecsDiff } from 'libraries/time/utils';
import { concat, interval, map, take, takeLast, takeUntil, timer } from 'rxjs';

type TimeRemainingCallback = (milliSecsDiff: number) => any;

/*
  Solve for timer over 24 days found here:
  https://github.com/ReactiveX/rxjs/issues/3015
*/
export const getBigTimer$ = (timestamp: string) => {
  const milliSecsDiff = getMilliSecsDiff(timestamp);

  const MAX = 2147483647;

  if (milliSecsDiff > MAX) {
    const numIntervals = Math.floor(milliSecsDiff / MAX);
    const remainder = milliSecsDiff % MAX;
    return concat(timer(MAX, MAX).pipe(take(numIntervals)), timer(remainder)).pipe(takeLast(1));
  }

  return timer(milliSecsDiff);
};

export const getTimeRemaining$ = (timestamp: string, callback: TimeRemainingCallback) =>
  interval(1000).pipe(
    takeUntil(getBigTimer$(timestamp)),
    map(() => getMilliSecsDiff(timestamp)),
    map(callback)
  );
