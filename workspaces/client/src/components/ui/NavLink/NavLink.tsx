import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';

const TextLink = styled.a`
  color: ${tokens.color.white}; // should this inherit?
  text-decoration: none;
  &hover: {
    cursor: pointer;
  }
`;

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  // string type is temporary, should use keys from paths file
  href: string;
}

export const NavLink = ({ href, ...props }: NavLinkProps) => {
  return (
    <Link href={href} passHref>
      <TextLink {...props} />
    </Link>
  );
};
