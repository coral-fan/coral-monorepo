import { css } from '@emotion/react';
import { Link } from 'components/ui';
import { getIconComponent } from 'components/ui/icons/utils';
import avalancheLogoSVG from './avalanche-logo.svg';

const poweredByAvalancheStyle = css`
  display: flex;
  justify-self: flex-end;
  font-size: 18px;
  gap: 10px;
  align-items: center;
`;

const AvalancheLogo = getIconComponent('AvalancheLogo', avalancheLogoSVG);

const poweredByStyle = css`
  width: 100%;
`;

const linkStyle = css`
  display: flex;
`;

export const PoweredByAvalanche = () => (
  <div css={poweredByAvalancheStyle}>
    <span css={poweredByStyle}>Powered By</span>
    <Link css={linkStyle} href="https://www.avax.network/" openInNewTab>
      <AvalancheLogo />
    </Link>
  </div>
);
