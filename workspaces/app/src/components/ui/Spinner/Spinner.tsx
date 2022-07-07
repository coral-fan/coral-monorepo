import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { SpinnerProps } from './types';

const SIZE = `20px`;
const COLOR = `${tokens.background.color.primary}`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div<SpinnerProps>`
  /* spinner css variables */
  --size: ${({ size = SIZE }) => size};
  --ring-size: calc(var(--size));
  --ring-spacing: calc(var(--size) / 7.5);
  --color: ${({ color = COLOR }) => color};

  display: inline-block;
  position: relative;
  width: var(--size);
  height: var(--size);
`;

const Ring = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: var(--ring-size);
  height: var(--ring-size);
  border: var(--ring-spacing) solid var(--color);
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--color) transparent transparent transparent;

  &:nth-of-type(1) {
    animation-delay: -0.45s;
  }

  &:nth-of-type(2) {
    animation-delay: -0.3s;
  }

  &:nth-of-type(3) {
    animation-delay: -0.15s;
  }
`;

export const Spinner = ({ size, color }: SpinnerProps) => (
  <Wrapper size={size} color={color}>
    <Ring />
    <Ring />
    <Ring />
    <Ring />
  </Wrapper>
);
