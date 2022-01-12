import styled from '@emotion/styled';
import { ComponentProps, useEffect, useState } from 'react';
import { interval, takeUntil, timer } from 'rxjs';
import { getTimeRemaining, getDateString, getTimeString, getDateStringShort } from './utils';
import tokens from 'styles/tokens';

type Size = 'sm' | 'lg';

export interface DropTimerProp {
  timestamp: string;
  size: Size;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Heading = styled.div`
  font-size: 10px;
  font-weight: 700;
  line-height: 122%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const TimeContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 9px;
`;

const TimePart = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 4px;
`;

interface TimeNumProps extends ComponentProps<'div'> {
  size: Size;
}
const TimeNum = styled.div<TimeNumProps>`
  font-size: ${(props) => (props.size === 'lg' ? '18px' : '14px')};
  color: ${tokens.color.white};
  line-height: ${(props) => (props.size === 'lg' ? '23px' : '18px')};
`;

const TimeText = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: ${tokens.color.gray};
  line-height: 122%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const DropTimer = ({ timestamp, size }: DropTimerProp) => {
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
      <Heading>
        {size === 'lg' ? `Sale starts ${dateString}` : `${dateStringShort}`} at {timeString}
      </Heading>
      <TimeContainer>
        <TimePart>
          <TimeNum size={size}>{daysDiff}</TimeNum>
          <TimeText>{size === 'lg' ? 'days' : 'd'}</TimeText>
        </TimePart>
        <TimePart>
          <TimeNum size={size}>{hoursDiff}</TimeNum>
          <TimeText>{size === 'lg' ? 'hrs' : 'h'}</TimeText>
        </TimePart>
        <TimePart>
          <TimeNum size={size}>{minutesDiff}</TimeNum>
          <TimeText>{size === 'lg' ? 'mins' : 'm'}</TimeText>
        </TimePart>
        <TimePart>
          <TimeNum size={size}>{secondsDiff}</TimeNum>
          <TimeText>{size === 'lg' ? 'secs' : 's'}</TimeText>
        </TimePart>
      </TimeContainer>
    </Container>
  );
};
