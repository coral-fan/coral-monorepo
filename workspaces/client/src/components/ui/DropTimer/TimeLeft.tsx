import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { TimePartProps, TimeProp } from './types';

const Container = styled.div`
  display: inline-grid;
  grid-template-columns: 26px 1fr;
  align-items: baseline;
`;

const TimeDiff = styled.div<TimeProp>`
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

const getTimeUnit = ({ timeDiff, timeUnit, variant }: TimePartProps) => {
  // mini variant returns single letter
  if (variant === 'mini') return `${timeUnit[0]}`;

  // handle singular time units
  if (timeDiff === 1) return `${timeUnit.slice(0, -1)}`;
  return timeUnit;
};

export const TimePart = ({ timeDiff, timeUnit, variant }: TimePartProps) => {
  const unit = getTimeUnit({ timeDiff, timeUnit, variant });

  return (
    <Container>
      <TimeDiff variant={variant}>{timeDiff}</TimeDiff>
      <TimeUnit>{unit}</TimeUnit>
    </Container>
  );
};
