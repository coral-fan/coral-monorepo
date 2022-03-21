import NextLink from 'next/link';
import { ForwardedRef, ComponentPropsWithRef, forwardRef } from 'react';
import { css, SerializedStyles } from '@emotion/react';

const getlinkStyle = (style?: SerializedStyles) => css`
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
  ${style};
`;

export interface LinkProps extends ComponentPropsWithRef<'a'> {
  // string type is temporary, should use keys from paths file
  href: string;
  css?: SerializedStyles;
}

/*
  Fix for displayName error when using forwardRef from:
  https://github.com/yannickcr/eslint-plugin-react/issues/2269
*/
export const Link = forwardRef(function Link(
  { href, css, ...props }: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return (
    <NextLink href={href} passHref>
      <a css={getlinkStyle(css)} ref={ref} {...props} />
    </NextLink>
  );
});
