import styled from '@emotion/styled';
import { FC } from 'react';
import tokens from 'styles/tokens';
import { BaseButton, BaseButtonProps as ButtonProps } from '../../BaseButton';

const Wrapper = styled(BaseButton)`
  text-transform: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  letter-spacing: inherit;
  color: inherit;
  background-color: inherit;
  border: none;
  text-align: left;
  text-decoration: inherit;
  width: fit-content;

  &:hover {
    color: ${tokens.font.color.brand};
  }
`;

export const LinkButton: FC<ButtonProps> = ({ children, loading, ...props }) => (
  <Wrapper loading={loading} {...props}>
    {children}
  </Wrapper>
);
