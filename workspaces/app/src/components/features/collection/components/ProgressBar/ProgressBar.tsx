import { css } from '@emotion/react';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { getProgressBarStyle } from './utils';

export interface ProgressBarProps {
  numMinted: number;
  maxSupply: number;
}

const { spacing, border, background, font } = tokens;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.mobile.xs};
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: ${font.size.xs};
  letter-spacing: ${font.letter_spacing.xs};
  line-height: ${font.line_height.xs};
  color: ${font.color.primary};
`;

const progressBarStyle = css`
  height: 10px;
  border-radius: ${border.radius.sm};
`;

const ProgressBarBackground = styled.div`
  ${progressBarStyle};
  width: 100%;
  background: ${background.color.tertiary};
`;

const ProgressIndicator = styled.div`
  ${progressBarStyle};
  background: ${background.color.contrast};
`;

export const ProgressBar = ({ numMinted, maxSupply }: ProgressBarProps) => {
  const numAvailable = maxSupply - numMinted;
  return (
    <Container>
      <ProgressBarBackground>
        <ProgressIndicator css={getProgressBarStyle({ numMinted, maxSupply })} />
      </ProgressBarBackground>
      <TextContainer>
        <span>{numAvailable} Available</span>
        <span>{maxSupply} Drops</span>
      </TextContainer>
    </Container>
  );
};
