import NextLink from 'next/link';
import { ForwardedRef, ComponentPropsWithRef, forwardRef } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import tokens from 'styles/tokens';

export interface LinkProps extends ComponentPropsWithRef<'a'> {
  // string type is temporary, should use keys from paths file
  href: string;
  css?: SerializedStyles;
  hoverVariant?: keyof typeof tokens.font.color;
}

const getlinkStyle = (
  hoverVariant: LinkProps['hoverVariant'] = 'brand',
  style?: SerializedStyles
) => css`
  text-decoration: none;
  &:hover {
    cursor: pointer;
    color: ${tokens.font.color[hoverVariant]};
  }
  ${style};
`;

/*
  Fix for displayName error when using forwardRef from:
  https://github.com/yannickcr/eslint-plugin-react/issues/2269
*/
export const Link = forwardRef(function Link(
  { href, hoverVariant, css, ...props }: LinkProps,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return (
    <NextLink href={href} passHref>
      <a css={getlinkStyle(hoverVariant, css)} ref={ref} {...props} />
    </NextLink>
  );
});
