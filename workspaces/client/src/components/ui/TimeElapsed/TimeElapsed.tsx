import { getTimeElapsed } from './utils';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';

const TimeElapsedWrapper = styled.div`
  color: ${tokens.color.gray};
  font-weight: bold;
  text-transform: uppercase;
  font-size: 10px;
  line-height: 122%;
  letter-spacing: 0.08em;
`;

export interface TimeElapsedProps {
  date: string;
}

export const TimeElapsed = ({ date }: TimeElapsedProps) => {
  const timeElapsed = getTimeElapsed(date);
  return <TimeElapsedWrapper>{timeElapsed}</TimeElapsedWrapper>;
};
