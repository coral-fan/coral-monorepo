/*
Slider styling adapted from:
https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
*/
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ChangeEventHandler } from 'react';
import tokens from 'styles/tokens';

const sliderThumbStyle = css`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: ${tokens.background.color.brand};
  cursor: pointer;
  margin-top: -8px; /* According to css-tricks, you need to specify a margin in Chrome, but in Firefox and IE it is automatic */
`;

const sliderTrackStyle = css`
  width: 100%;
  height: 5px;
  cursor: pointer;
  background: ${tokens.background.color.primary};
  border-radius: 14px;
`;

const SliderInput = styled.input`
  -webkit-appearance: none;
  width: 100%;
  margin: 18px 0;
  background: transparent;

  &:focus {
    outline: none;
  }

  /* Special styling for WebKit/Blink */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${sliderThumbStyle};
  }

  &::-webkit-slider-runnable-track {
    ${sliderTrackStyle};
  }

  // Do we want a focus color?
  &:focus::-webkit-slider-runnable-track {
    background: ${tokens.border.color.secondary};
  }

  /* Firefox */
  &::-moz-range-thumb {
    ${sliderThumbStyle};
  }
  &::-moz-range-track {
    ${sliderTrackStyle};
  }
`;

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  step: number;
}

export const Slider = ({ min, max, value, onChange, step }: SliderProps) => (
  <SliderInput
    type="range"
    min={min}
    max={max}
    value={value}
    onChange={onChange}
    step={step}
  ></SliderInput>
);
