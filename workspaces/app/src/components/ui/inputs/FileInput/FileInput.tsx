import styled from '@emotion/styled';
import { ComponentProps, ForwardedRef, forwardRef } from 'react';
import tokens from 'styles/tokens';
import { getInputId } from '../utils';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  error?: string;
}

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  text-transform: uppercase;
  font-size: ${tokens.font.size.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  line-height: ${tokens.font.line_height.xs};
  font-weight: ${tokens.font.weight.bold};
  text-decoration: underline;
  padding: 12px;

  &:hover {
    cursor: pointer;
  }
`;

export const FileInput = forwardRef(function FileInput(
  { label, children, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputId = getInputId(label);
  return (
    <Label htmlFor={inputId}>
      <Input id={inputId} ref={ref} type="file" accept="image/*" {...props} />
      {children}
    </Label>
  );
});
