import { css } from '@emotion/react';
import { LogoIcon, Link } from 'components/ui';
import { getIconComponent } from 'components/ui/icons/utils';
import { CLIENT_ENVIRONMENT } from 'consts';
import tokens, { QUERY } from 'styles/tokens';
import logoWordmarkSVG from './logo-wordmark.svg';

const LogoWordmarkIcon = getIconComponent('LogoWordmarkIcon', logoWordmarkSVG);

const logoHomeLinkStyle = css`
  --button-size: ${tokens.buttons.size.mobile};

  @media ${QUERY.LAPTOP} {
    --button-size: ${tokens.buttons.size.desktop};
  }

  width: var(--button-size);
  height: var(--button-size);
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LogoHomeLink = () => (
  <Link css={logoHomeLinkStyle} href="/">
    {CLIENT_ENVIRONMENT === 'production' ? <LogoWordmarkIcon /> : <LogoIcon />}
  </Link>
);
