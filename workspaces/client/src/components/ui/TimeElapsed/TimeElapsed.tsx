import { getTimeDifference } from './utils';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';

const DEFAULT_TIME_ELAPSED = 'Just Now';

const TimeElapsedComponent = styled.div`
  color: ${tokens.color.gray};
  font-weight: bold;
  text-transform: uppercase;
  font-size: 10px;
  line-height: 122%;
  letter-spacing: 0.08em;
`;

export interface DateType {
  date: string;
}

export const TimeElapsed = ({ date }: DateType) => {
  const startTime = new Date(date).getTime();
  const currentTime = new Date().getTime();

  let displayDiff;

  if (currentTime - startTime > 0) {
    const { yearsDiff, monthsDiff, daysDiff, hoursDiff, minutesDiff, secondsDiff } =
      getTimeDifference(date);

    displayDiff =
      yearsDiff > 0 ? (
        <>
          {yearsDiff} {yearsDiff > 1 ? 'years' : 'year'} ago{' '}
        </>
      ) : monthsDiff > 0 ? (
        <>
          {monthsDiff} {monthsDiff > 1 ? 'months' : 'month'} ago{' '}
        </>
      ) : daysDiff > 0 ? (
        <>{daysDiff}D ago</>
      ) : hoursDiff > 0 ? (
        <>{hoursDiff}H ago</>
      ) : minutesDiff > 0 ? (
        <>{minutesDiff}M ago</>
      ) : (
        <>{secondsDiff}S ago</>
      );
  } else {
    displayDiff = <>{DEFAULT_TIME_ELAPSED}</>;
  }

  return <TimeElapsedComponent>{displayDiff}</TimeElapsedComponent>;
};
