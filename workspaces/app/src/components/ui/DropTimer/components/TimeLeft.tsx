import styled from '@emotion/styled';
import tokens from 'styles/tokens';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  width: fit-content;
  font-size: ${tokens.font.size.xl};
  color: ${tokens.font.color.primary};
  line-height: ${tokens.font.line_height.xl};

  &:last-child {
    justify-self: end;
  }
`;

export interface TimeLeftProps {
  timeDiff: number;
  timeUnit: 'd' | 'h' | 'm' | 's';
}

export const TimeLeft = ({ timeDiff, timeUnit }: TimeLeftProps) => {
  return (
    <Container>
      {timeDiff}
      {timeUnit}
    </Container>
  );
};
