import styled from '@emotion/styled';
import { useCallback, useMemo } from 'react';
import { interval, map, takeUntil } from 'rxjs';
import { getTimeRemaining, bigTimer } from './utils';
import { TimeLeft, Heading } from './components';
import { TimeProp, Variant } from './types';
import { useObservable } from 'libraries/utils/hooks';

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
  const getTimeRemaining$ = useCallback(
    () =>
      interval(1000).pipe(
        takeUntil(bigTimer(timestamp)),
        map(() => getTimeRemaining(timestamp))
      ),
    [timestamp]
  );

  const initialTimeRemaining = useMemo(() => getTimeRemaining(timestamp), [timestamp]);

  const timeRemaining = useObservable(getTimeRemaining$, initialTimeRemaining);

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
