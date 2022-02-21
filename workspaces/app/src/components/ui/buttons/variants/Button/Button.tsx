import { css } from '@emotion/react';
import { FC } from 'react';
import { BaseButton, BaseButtonProps as ButtonProps } from 'components/ui';
import tokens from 'styles/tokens';

const ButtonStyle = css`
  padding: 15px;
  text-transform: uppercase;
  font-size: ${tokens.font.size.sm};
  line-height: ${tokens.font.line_height.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  color: ${tokens.font.color.button};
  border-radius: ${tokens.border.radius.sm};
  background-color: ${tokens.background.color.brand};
  border: ${tokens.background.color.brand};
`;

export const Button: FC<ButtonProps> = ({ children, loading, ...props }) => (
  <BaseButton css={ButtonStyle} loading={loading} {...props}>
    {children}
  </BaseButton>
);
