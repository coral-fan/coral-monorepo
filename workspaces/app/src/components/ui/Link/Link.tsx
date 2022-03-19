import NextLink from 'next/link';
import { ForwardedRef, ComponentPropsWithRef, forwardRef } from 'react';
import { css } from '@emotion/react';
import tokens from 'styles/tokens';

const linkStyle = css`
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: ${tokens.font.color.brand};
  }
`;

export interface BaseLinkProps extends ComponentPropsWithRef<'a'> {
  // string type is temporary, should use keys from paths file
  href: string;
}

/*
  Fix for displayName error when using forwardRef from:
  https://github.com/yannickcr/eslint-plugin-react/issues/2269
*/
export const Link = forwardRef(function BaseLink(
  { href, ...props }: BaseLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return (
    <NextLink href={href} passHref>
      <a css={linkStyle} ref={ref} {...props} />
    </NextLink>
  );
});
