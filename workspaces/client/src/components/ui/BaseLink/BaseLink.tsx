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

export const BaseLink = forwardRef(function BaseLink({ href, ref, ...props }: BaseLinkProps) {
  return (
    <Link href={href} passHref>
      <a css={linkStyle} ref={ref} {...props} />
    </Link>
  );
});
