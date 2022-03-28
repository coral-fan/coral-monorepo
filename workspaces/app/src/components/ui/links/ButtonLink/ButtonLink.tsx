import { css } from '@emotion/react';
import { buttonStyle } from 'components/ui/buttons';
import { Link, LinkProps } from '../Link';

const buttonLinkStyle = css`
  ${buttonStyle};
  text-align: center;
`;
export const ButtonLink = ({ children, ...props }: Omit<LinkProps, 'hoverVariant'>) => (
  <Link hoverVariant="contrast" css={buttonLinkStyle} {...props}>
    {children}
  </Link>
);
