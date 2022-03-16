import styled from '@emotion/styled';
import { ComponentProps, ForwardedRef, forwardRef } from 'react';
import tokens from 'styles/tokens';
import { colors } from 'styles';

const HiddenInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const Slider = styled.div`
  position: relative;
  width: 35px;
  height: 20px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: 'transparent';
  border: solid ${tokens.border.color.primary} 1px;
  border-radius: 17px;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: '';
    height: 12px;
    width: 12px;
    left: 4px;
    top: 3px;
    background-color: ${colors.cloud[10]};
    transition: 0.4s;
    border-radius: 50%;
  }

  ${HiddenInput}:checked + & {
    background-color: ${tokens.background.color.brand};
    border-color: ${tokens.border.color.brand};

    &:before {
      transform: translateX(12px);
      background-color: ${tokens.background.color.primary};
    }
  }
`;

const Wrapper = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Label = styled.span`
  display: block;
  padding-left: 10px;
  font-size: ${tokens.font.size.xs};
  text-transform: uppercase;
`;

interface ToggleProps extends ComponentProps<'input'> {
  label: string;
}

export const Toggle = forwardRef(function Toggle(
  { label, ...inputProps }: ToggleProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <Wrapper>
      <HiddenInput type="checkbox" ref={ref} {...inputProps} />
      <Slider />
      {label && <Label>{label}</Label>}
    </Wrapper>
  );
});
