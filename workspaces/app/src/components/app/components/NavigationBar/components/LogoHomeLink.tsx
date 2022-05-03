import { css } from '@emotion/react';
import { LogoIcon, Link } from 'components/ui';
import tokens, { QUERY } from 'styles/tokens';

const logoHomeLinkStyle = css`
  --button-size: ${tokens.buttons.size.mobile};

  @media ${QUERY.LAPTOP} {
    --button-size: ${tokens.buttons.size.desktop};
  }

  height: var(--button-size);
  width: var(--button-size);

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoHomeLink = () => (
  <Link css={logoHomeLinkStyle} href="/">
    <LogoIcon />
  </Link>
);
