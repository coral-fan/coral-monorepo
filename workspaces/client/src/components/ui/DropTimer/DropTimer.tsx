import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { interval, takeUntil, timer } from 'rxjs';
import { getTimeRemaining, getMilliSecsDiff } from './utils';
import { TimePart } from './TimePart';
import { TimeProp, DropTimerProps } from './types';
import { Heading } from './Heading';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TimeContainer = styled.div<TimeProp>`
  width: fit-content;
  display: flex;
  gap: 6px;
`;

export const DropTimer = ({ timestamp, variant }: DropTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(timestamp));

  const milliSecsDiff = getMilliSecsDiff(timestamp);

  useEffect(() => {
    const countdown$ = timer(milliSecsDiff);

    // Subscribe to countdown until endTime reached
    const countdown = interval(1000).pipe(takeUntil(countdown$));

    const subscription = countdown.subscribe({
      next: () => {
        setTimeRemaining(getTimeRemaining(timestamp));
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const { daysDiff, hoursDiff, minutesDiff, secondsDiff } = timeRemaining;

  return (
    <Container>
      <Heading variant={variant} timestamp={timestamp} />
      <TimeContainer variant={variant}>
        <TimePart timeNum={daysDiff} timeUnit={'days'} variant={variant} />
        <TimePart timeNum={hoursDiff} timeUnit={'hrs'} variant={variant} />
        <TimePart timeNum={minutesDiff} timeUnit={'mins'} variant={variant} />
        <TimePart timeNum={secondsDiff} timeUnit={'secs'} variant={variant} />
      </TimeContainer>
    </Container>
  );
};
