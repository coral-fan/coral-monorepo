import { ComponentProps, ForwardedRef, forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';

const textStyle = css`
  text-transform: uppercase;
  font-size: ${tokens.font.size.xs};
  font-weight: ${tokens.font.weight.normal};
  line-height: ${tokens.font.line_height.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
`;

const Label = styled.label`
  ${textStyle};
  color: ${tokens.font.color.primary};
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 6px;
`;

const getInputStyle = (error?: string) => css`
  background-color: ${tokens.background.color.primary};
  border-radius: ${tokens.border.radius.sm};
  height: 45px;
  font-size: ${tokens.font.size.sm};
  color: ${tokens.font.color.primary};
  padding: 13px 10px 13px 16px;
  border: ${`solid ${error ? tokens.border.color.error : 'transparent'} 1px`};

  &:focus {
    ${error ? undefined : `border-color: ${tokens.border.color.brand};`}
    outline: none;
  }
`;

const Error = styled.div`
  ${textStyle};
  min-height: 12px;
  color: ${tokens.font.color.error};
`;

interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
}

export const Input = forwardRef(function Input(
  { label, error, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputId = label.toLowerCase().split(' ').join('-');
  return (
    <Container>
      <Label htmlFor={inputId}>{label}</Label>
      <input id={inputId} css={getInputStyle(error)} ref={ref} {...props}></input>
      {error && <Error>{error}</Error>}
    </Container>
  );
});
