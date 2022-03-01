import styled from '@emotion/styled';
import { FC } from 'react';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';

type ItemProps = {
  notificationCount?: number;
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
  padding: 16px 0px;
  font-size: ${tokens.font.size.lg};
  line-height: ${tokens.font.line_height.lg};
  letter-spacing: ${tokens.font.letter_spacing.lg};
  border-top: solid ${tokens.border.color.secondary} 1px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    font-size: ${tokens.font.size.xl};
    line-height: ${tokens.font.line_height.xl};
    letter-spacing: ${tokens.font.letter_spacing.xl};
  }

  &:first-of-type {
    border-top: none;
  }
`;

export const Item: FC<ItemProps> = ({ children }) => <Wrapper>{children}</Wrapper>;
