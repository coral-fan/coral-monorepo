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
  display: inline-block;
  position: relative;
  width: ${({ size }) => size};
  height: ${({ size }) => size}; ;
`;

const Ring = styled.div<SpinnerProp>`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: calc(${({ size }) => size} * 0.8);
  height: calc(${({ size }) => size} * 0.8);
  margin: calc(${({ size }) => size} / 10);
  border: calc(${({ size }) => size} / 10) solid ${tokens.color.white};
  border-radius: 50%;
  animation: ${spin} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: ${tokens.color.white} transparent transparent transparent;

  &:nth-child(1) {
    animation-delay: -0.45s;
  }

  &:nth-child(2) {
    animation-delay: -0.3s;
  }

  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

export const Spinner = ({ size = SIZE }: SpinnerProp) => (
  <Wrapper size={size}>
    <Ring size={size} />
    <Ring size={size} />
    <Ring size={size} />
    <Ring size={size} />
  </Wrapper>
);
