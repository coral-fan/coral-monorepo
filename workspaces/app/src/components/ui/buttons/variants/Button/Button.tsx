import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FC } from 'react';
import { BaseButton, BaseButtonProps as ButtonProps } from '../../BaseButton';
import tokens from 'styles/tokens';

const SIZE = tokens.font.size.sm;

export const buttonStyle = css`
  width: 100%;
  padding: 15px;
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
  min-height: 45px;
`;

const Wrapper = styled(BaseButton)`
  ${buttonStyle}
`;

export const Button: FC<ButtonProps> = ({ children, loading, ...props }) => (
  <Wrapper loading={loading} spinnerSize={SIZE} {...props}>
    {children}
  </Wrapper>
);
