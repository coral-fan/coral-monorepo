import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { getDateString, getTimeString } from '../utils';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${tokens.font.size.xs};
  font-weight: ${tokens.font.weight.normal};
  line-height: ${tokens.font.line_height.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  text-transform: uppercase;
  padding-left: 8px;
`;

interface HeadingProps {
  tokenSupply: number;
  timestamp: string;
}

export const Heading = ({ tokenSupply, timestamp }: HeadingProps) => {
  const date = getDateString(timestamp);
  const time = getTimeString(timestamp);

  // Design doc excludes comma, but likely necessary at 10k+
  const tokenSupplyFormatted = tokenSupply.toLocaleString();

  return (
    <Container>
      <span>{tokenSupplyFormatted} drops</span>
      <span>
        → {date}, {time}
      </span>
    </Container>
  );
};
