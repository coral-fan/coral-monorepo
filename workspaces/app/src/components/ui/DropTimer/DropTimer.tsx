import styled from '@emotion/styled';
import { useCallback, useMemo } from 'react';
import { interval, map, takeUntil } from 'rxjs';
import { getTimeRemaining, bigTimer } from './utils';
import { TimeLeft, Heading } from './components';
import { useObservable } from 'libraries/utils/hooks';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';

const DropTimerWrapper = styled.div`
  background-color: ${tokens.background.color.tertiary};
  border-radius: ${tokens.border.radius.sm};
  padding: 10px 16px;
`;

const DropTimerContainer = styled.div`
  max-width: 260px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    max-width: 480px;
  }
`;

const TimeContainer = styled.div`
  width: 100%;
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: start;
`;

export interface DropTimerProps {
  tokenSupply: number;
  timestamp: string;
}

export const DropTimer = ({ tokenSupply, timestamp }: DropTimerProps) => {
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
    <DropTimerWrapper>
      <DropTimerContainer>
        <Heading tokenSupply={tokenSupply} timestamp={timestamp} />
        <TimeContainer>
          <TimeLeft timeDiff={daysDiff} timeUnit={'d'} />
          <TimeLeft timeDiff={hoursDiff} timeUnit={'h'} />
          <TimeLeft timeDiff={minutesDiff} timeUnit={'m'} />
          <TimeLeft timeDiff={secondsDiff} timeUnit={'s'} />
        </TimeContainer>
      </DropTimerContainer>
    </DropTimerWrapper>
  );
};
