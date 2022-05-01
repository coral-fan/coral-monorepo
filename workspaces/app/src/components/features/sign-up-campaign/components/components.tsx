import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { SocialLinks, Link } from 'components/ui';
import { SocialHandles } from 'libraries/models';
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

const CORAL_SOCIAL_HANDLES: SocialHandles = {
  instagram: 'coral_fan',
  twitter: 'coral__fan',
};

export const CoralSocialLinks = () => <SocialLinks socialHandles={CORAL_SOCIAL_HANDLES} />;

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  gap: 20px;
`;
