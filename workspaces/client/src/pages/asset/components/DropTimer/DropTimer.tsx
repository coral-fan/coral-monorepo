import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { interval, takeUntil, timer } from 'rxjs';
import { getTimeRemaining, getDateString, getTimeString, getDateStringShort } from './utils';
import { TimePart } from './TimePart';
import { DropTimerProp, TimeProp } from './types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Heading = styled.div<TimeProp>`
  font-size: 10px;
  font-weight: 700;
  line-height: 122%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding-left: ${(props) => (!props.variant ? '12px' : '2px')};
`;

const TimeContainer = styled.div<TimeProp>`
  width: ${(props) => (!props.variant ? '256px' : '144px')};
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 7px;
  justify-items: start;
`;

export const DropTimer = ({ timestamp, variant }: DropTimerProp) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(timestamp));

  const startTime = new Date().getTime();
  const endTime = new Date(timestamp).getTime();

  useEffect(() => {
    const source = interval(1000);
    const duration$ = timer(endTime - startTime);

    // Subscribe to countdown until endTime reached
    const countdown = source.pipe(takeUntil(duration$));

    const timerSub = countdown.subscribe({
      next: () => {
        setTimeRemaining(getTimeRemaining(timestamp));
      },
    });

    return () => {
      timerSub.unsubscribe();
    };
  }, []);

  const { daysDiff, hoursDiff, minutesDiff, secondsDiff } = timeRemaining;

  const dateString = getDateString(timestamp);
  const dateStringShort = getDateStringShort(timestamp);
  const timeString = getTimeString(timestamp);

  return (
    <Container>
      <Heading variant={variant}>
        {!variant ? `Sale starts ${dateString}` : `${dateStringShort}`} at {timeString}
      </Heading>
      <TimeContainer variant={variant}>
        <TimePart timeNum={daysDiff} timeUnit={'days'} variant={variant} />
        <TimePart timeNum={hoursDiff} timeUnit={'hrs'} variant={variant} />
        <TimePart timeNum={minutesDiff} timeUnit={'mins'} variant={variant} />
        <TimePart timeNum={secondsDiff} timeUnit={'secs'} variant={variant} />
      </TimeContainer>
    </Container>
  );
};
