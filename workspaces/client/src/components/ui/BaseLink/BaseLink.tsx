import Link from 'next/link';
import { ForwardedRef, ComponentPropsWithRef, forwardRef } from 'react';
import { css } from '@emotion/react';

const linkStyle = css`
  text-decoration: none;
  &hover: {
    cursor: pointer;
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
export const BaseLink = forwardRef(function BaseLink(
  { href, ...props }: BaseLinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Link href={href} passHref>
      <a css={linkStyle} ref={ref} {...props} />
    </Link>
  );
});
