import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { SpinnerBaseProp as SpinnerProp } from './types';

const SIZE = `20px`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div<SpinnerProp>`
  /* spinner css variables */
  --size: ${({ size = SIZE }) => size};
  --ring-size: calc(var(--size) * 0.8);
  --ring-spacing: calc(var(--size) / 10);
  /* */

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
  margin: var(--ring-spacing);
  border: var(--ring-spacing) solid ${tokens.border.color.spinner};
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${tokens.border.color.spinner} transparent transparent transparent;

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

export const Spinner = ({ size }: SpinnerProp) => (
  <Wrapper size={size}>
    <Ring />
    <Ring />
    <Ring />
    <Ring />
  </Wrapper>
);
