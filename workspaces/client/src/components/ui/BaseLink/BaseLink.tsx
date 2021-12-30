import Link from 'next/link';
import { ForwardedRef, ComponentProps, forwardRef } from 'react';
import { css } from '@emotion/react';

const linkStyle = css`
  text-decoration: none;
  &hover: {
    cursor: pointer;
  }
`;

export interface BaseLinkProps extends ComponentProps<'a'> {
  // string type is temporary, should use keys from paths file
  href: string;
  ref: ForwardedRef<HTMLAnchorElement>;
}

/*
  Fix for displayName error when using forwardRef from:
  https://github.com/yannickcr/eslint-plugin-react/issues/2269
*/
export const BaseLink = forwardRef(function BaseLink({ href, ref, ...props }: BaseLinkProps) {
  return (
    <Link href={href} passHref>
      <a css={linkStyle} ref={ref} {...props} />
    </Link>
  );
});
