import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { interval, takeUntil } from 'rxjs';
import { getTimeRemaining, bigTimer } from './utils';
import { TimeLeft, Heading } from './components';
import { TimeProp, Variant } from './types';

const DropTimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const TimeContainer = styled.div<TimeProp>`
  width: fit-content;
  display: flex;
  gap: ${(props) => (props.variant !== 'mini' ? '6px' : '4px')};
`;

export interface DropTimerProps {
  timestamp: string;
  variant?: Variant;
}

export const DropTimer = ({ timestamp, variant = 'default' }: DropTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(timestamp));

  useEffect(() => {
    const timer$ = bigTimer(timestamp);

    // Subscribe to timer until endTime reached
    const countdown = interval(1000).pipe(takeUntil(timer$));

    const subscription = countdown.subscribe({
      next: () => {
        setTimeRemaining(getTimeRemaining(timestamp));
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [timestamp]);

  const { daysDiff, hoursDiff, minutesDiff, secondsDiff } = timeRemaining;

  return (
    <DropTimerContainer>
      <Heading variant={variant} timestamp={timestamp} />
      <TimeContainer variant={variant}>
        <TimeLeft timeDiff={daysDiff} timeUnit={'days'} variant={variant} />
        <TimeLeft timeDiff={hoursDiff} timeUnit={'hrs'} variant={variant} />
        <TimeLeft timeDiff={minutesDiff} timeUnit={'mins'} variant={variant} />
        <TimeLeft timeDiff={secondsDiff} timeUnit={'secs'} variant={variant} />
      </TimeContainer>
    </DropTimerContainer>
  );
};
