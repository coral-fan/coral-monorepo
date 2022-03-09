import styled from '@emotion/styled';
import { Link, LinkButton } from 'components/ui';
import { FC } from 'react';
import tokens from 'styles/tokens';

interface BaseItemProp {
  setShowMenu: (showMenu: boolean) => void;
}

interface ButtonProps extends BaseItemProp {
  onClick?: () => void;
  to?: never;
}

interface LinkProps extends BaseItemProp {
  onClick?: never;
  to?: string;
}

export type ItemProps = ButtonProps | LinkProps;

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

export const Item: FC<ItemProps> = ({ onClick, to, children, setShowMenu }) => {
  return (
    <Wrapper onClick={() => setShowMenu(false)}>
      {to ? (
        <Link href={to}>{children}</Link>
      ) : (
        <LinkButton onClick={onClick}>{children}</LinkButton>
      )}
    </Wrapper>
  );
};
