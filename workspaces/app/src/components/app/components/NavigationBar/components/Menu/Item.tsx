import styled from '@emotion/styled';
import { FC } from 'react';
import tokens from 'styles/tokens';

type ItemProps = {
  notificationCount?: number;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  padding: 16px 0px;
  font-size: ${tokens.font.size.lg};
  font-weight: ${tokens.font.weight.bold};
  line-height: ${tokens.font.line_height.lg};
  letter-spacing: ${tokens.font.letter_spacing.lg};
  border-top: solid ${tokens.border.color.secondary} 1px;

  &:first-of-type {
    border-top: none;
  }
`;

export const Item: FC<ItemProps> = ({ children }) => <Wrapper>{children}</Wrapper>;
