import styled from '@emotion/styled';
import tokens, { QUERIES } from 'styles/tokens';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  width: fit-content;
  color: ${tokens.font.color.primary};
  font-size: ${tokens.font.size.xl};
  line-height: ${tokens.font.line_height.xl};

  @media ${QUERIES.laptopAndUp} {
    font-size: ${tokens.font.size.xxl};
    line-height: ${tokens.font.line_height.xxl};
  }

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
