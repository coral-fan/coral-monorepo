import { useEffect, useState } from 'react';
import { interval } from 'rxjs';
import { getTimeRemaining } from './utils';

export interface DropTimerProp {
  date: string;
}

export const DropTimer = ({ date }: DropTimerProp) => {
  const [timeRemaining, setTimeRemaining] = useState({
    daysDiff: 0,
    hoursDiff: 0,
    minutesDiff: 0,
    secondsDiff: 0,
  });

  useEffect(() => {
    const timerSub = interval(1000).subscribe({
      next: () => {
        setTimeRemaining(getTimeRemaining(date));
      },
    });
    return () => {
      timerSub.unsubscribe();
    };
  }, []);

  const { daysDiff, hoursDiff, minutesDiff, secondsDiff } = timeRemaining;

  return (
    <div>
      {daysDiff} days {hoursDiff} hours {minutesDiff} minutes {secondsDiff} seconds
    </div>
  );
};
