import { ComponentProps, ForwardedRef, forwardRef } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';

const textStyle = css`
  text-transform: uppercase;
  font-size: 10px;
  font-weight: bold;
  line-height: 12px;
  letter-spacing: 0.08em;
`;

const Label = styled.label`
  ${textStyle};
  color: ${tokens.color.gray};
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;

const getInputStyle = (error?: string) => css`
  background-color: ${tokens.color.background.primary};
  border-radius: 30px;
  height: 37px;
  font-size: 14px;
  padding: 13px 10px;
  border: ${`solid ${error ? tokens.color.red : 'transparent'} 1px`};

  &:focus {
    ${error ? undefined : `border-color: ${tokens.color.action.primary};`}
    outline: none;
  }
`;

const Error = styled.div`
  ${textStyle};
  min-height: 12px;
  color: ${tokens.color.red};
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
      <Error>{error ?? ''}</Error>
    </Container>
  );
});
