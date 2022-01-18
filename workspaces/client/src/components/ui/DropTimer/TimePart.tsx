import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { TimePartProps, TimeProp } from './types';

const Container = styled.div`
  display: inline-grid;
  grid-template-columns: 26px 1fr;
  align-items: baseline;
`;

const TimeNum = styled.div<TimeProp>`
  font-size: ${(props) => (props.variant !== 'mini' ? '18px' : '14px')};
  color: ${tokens.color.white};
  line-height: ${(props) => (props.variant !== 'mini' ? '23px' : '18px')};
  text-align: center;
`;

const TimeUnit = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: ${tokens.color.gray};
  line-height: 122%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const getTimeUnit = ({ timeNum, timeUnit, variant }: TimePartProps) => {
  // mini variant returns single letter
  if (variant === 'mini') return `${timeUnit[0]}`;

  // handle singular time units
  if (timeNum === 1) return `${timeUnit.slice(0, -1)}`;
  return timeUnit;
};

export const TimePart = ({ timeNum, timeUnit, variant }: TimePartProps) => {
  const unit = getTimeUnit({ timeNum, timeUnit, variant });

  return (
    <Container>
      <TimeNum variant={variant}>{timeNum}</TimeNum>
      <TimeUnit>{unit}</TimeUnit>
    </Container>
  );
};
