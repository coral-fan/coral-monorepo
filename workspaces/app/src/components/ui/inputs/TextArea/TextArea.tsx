import { ComponentProps, ForwardedRef, forwardRef } from 'react';
import { getInputStyle } from '../utils';
import { Container, Label, Error } from '../components';

interface TextAreaProps extends ComponentProps<'textarea'> {
  label: string;
  error?: string;
}

export const TextArea = forwardRef(function TextArea(
  { label, error, ...props }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const inputId = label.toLowerCase().split(' ').join('-');
  return (
    <Container>
      <Label htmlFor={inputId}>{label}</Label>
      <textarea
        id={inputId}
        css={getInputStyle({ type: 'textarea', error })}
        ref={ref}
        {...props}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
});
