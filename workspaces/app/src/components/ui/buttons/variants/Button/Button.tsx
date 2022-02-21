import styled from '@emotion/styled';
import { FC } from 'react';
import { BaseButton, BaseButtonProps as ButtonProps } from '../../BaseButton';
import tokens from 'styles/tokens';

const Wrapper = styled(BaseButton)`
  padding: 15px;
  text-transform: uppercase;
  font-size: ${tokens.font.size.sm};
  font-weight: ${tokens.font.weight.bold};
  line-height: ${tokens.font.line_height.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  color: ${tokens.font.color.contrast};
  border-radius: ${tokens.border.radius.sm};
  background-color: ${tokens.background.color.brand};
  border: ${tokens.background.color.brand};
`;

export const Button: FC<ButtonProps> = ({ children, loading, ...props }) => (
  <Wrapper loading={loading} {...props}>
    {children}
  </Wrapper>
);
