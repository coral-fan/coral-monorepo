import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { TimeLeftProps, TimeProp } from './types';

const Container = styled.div<TimeProp>`
  display: inline-grid;
  grid-template-columns: 24px 1fr;
  align-items: baseline;
  column-gap: ${(props) => (props.variant !== 'mini' ? '2px' : '0px')};
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

const getTimeUnit = ({ timeDiff, timeUnit, variant }: TimeLeftProps) => {
  // mini variant returns single letter
  if (variant === 'mini') return `${timeUnit[0]}`;

  // handle singular time units
  if (timeDiff === 1) return `${timeUnit.slice(0, -1)}`;
  return timeUnit;
};

export const TimeLeft = ({ timeDiff, timeUnit, variant }: TimeLeftProps) => {
  const unit = getTimeUnit({ timeDiff, timeUnit, variant });

  return (
    <Container variant={variant}>
      <TimeDiff variant={variant}>{timeDiff}</TimeDiff>
      <TimeUnit>{unit}</TimeUnit>
    </Container>
  );
};
