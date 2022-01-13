import styled from '@emotion/styled';
import { ComponentProps, useEffect, useState } from 'react';
import { interval, takeUntil, timer } from 'rxjs';
import { getTimeRemaining, getDateString, getTimeString, getDateStringShort } from './utils';
import tokens from 'styles/tokens';

type Variant = 'mini';

export interface DropTimerProp {
  timestamp: string;
  variant?: Variant;
}

interface TimeProp extends ComponentProps<'div'> {
  variant?: Variant;
}

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
  padding-left: ${(props) => (!props.variant ? '8px' : '2px')};
`;

const TimeContainer = styled.div<TimeProp>`
  width: ${(props) => (!props.variant ? '256px' : '144px')};
  display: inline-grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 9px;
  justify-items: start;
`;

const TimePart = styled.div`
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  justify-items: end;
  align-items: baseline;
  column-gap: 4px;
`;

const TimeNum = styled.div<TimeProp>`
  font-size: ${(props) => (!props.variant ? '18px' : '14px')};
  color: ${tokens.color.white};
  line-height: ${(props) => (!props.variant ? '23px' : '18px')};
`;

const TimeText = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: ${tokens.color.gray};
  line-height: 122%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const DropTimer = ({ timestamp, variant }: DropTimerProp) => {
  const [timeRemaining, setTimeRemaining] = useState({
    daysDiff: 0,
    hoursDiff: 0,
    minutesDiff: 0,
    secondsDiff: 0,
  });

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
        <TimePart>
          <TimeNum variant={variant}>{daysDiff}</TimeNum>
          <TimeText>{!variant ? 'days' : 'd'}</TimeText>
        </TimePart>
        <TimePart>
          <TimeNum variant={variant}>{hoursDiff}</TimeNum>
          <TimeText>{!variant ? 'hrs' : 'h'}</TimeText>
        </TimePart>
        <TimePart>
          <TimeNum variant={variant}>{minutesDiff}</TimeNum>
          <TimeText>{!variant ? 'mins' : 'm'}</TimeText>
        </TimePart>
        <TimePart>
          <TimeNum variant={variant}>{secondsDiff}</TimeNum>
          <TimeText>{!variant ? 'secs' : 's'}</TimeText>
        </TimePart>
      </TimeContainer>
    </Container>
  );
};
