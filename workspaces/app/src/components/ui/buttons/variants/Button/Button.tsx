import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { BaseButton, BaseButtonProps as ButtonProps } from '../../BaseButton';
import tokens from 'styles/tokens';

const SIZE = tokens.font.size.sm;

export const buttonStyle = css`
  width: 100%;
  text-transform: uppercase;
  font-size: ${SIZE};
  font-weight: ${tokens.font.weight.bold};
  line-height: ${tokens.font.line_height.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  color: ${tokens.font.color.contrast};
  border-radius: ${tokens.border.radius.sm};
  background-color: ${tokens.background.color.brand};
  border: ${tokens.background.color.brand};
  min-width: 45px;
  height: 49px;
`;

const Wrapper = styled(BaseButton)`
  ${buttonStyle}
`;

export const Button = ({ children, loading, ...props }: ButtonProps) => (
  <Wrapper loading={loading} spinnerSize={SIZE} {...props}>
    {children}
  </Wrapper>
);
