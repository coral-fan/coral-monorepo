import { ComponentProps, ForwardedRef, forwardRef } from 'react';
import { getInputStyle } from '../utils';
import { Container, Label, Error } from '../components';

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
      <input id={inputId} css={getInputStyle({ type: 'input', error })} ref={ref} {...props} />
      {error && <Error>{error}</Error>}
    </Container>
  );
});
