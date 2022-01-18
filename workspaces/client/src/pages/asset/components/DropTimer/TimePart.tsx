import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { TimePartProps, TimeProp } from './types';

const Container = styled.div`
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

const TimeUnit = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: ${tokens.color.gray};
  line-height: 122%;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const TimePart = ({ timeNum, timeUnit, variant }: TimePartProps) => (
  <Container>
    <TimeNum variant={variant}>{timeNum}</TimeNum>
    <TimeUnit>{!variant ? timeUnit : `${timeUnit[0]}`}</TimeUnit>
  </Container>
);
