import { getTimeElapsed } from './utils';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';

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
  const timeElapsed = getTimeElapsed(date);
  return <TimeElapsedComponent>{timeElapsed}</TimeElapsedComponent>;
};
