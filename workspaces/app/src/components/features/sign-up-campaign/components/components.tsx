import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'components/ui';
import { getIconComponent } from 'components/ui/icons/utils';
import { avalancheLogoSVG, instagramIconSVG, twitterIconSVG, discordIconSVG } from './assets';
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

export const PoweredByAvalanche = () => (
  <div css={poweredByAvalancheStyle}>
    <span css={poweredByStyle}>Powered By</span>
    <AvalancheLogo />
  </div>
);

const InstagramIcon = getIconComponent('InstagramIcon', instagramIconSVG);
const TwitterIcon = getIconComponent('TwitterIcon', twitterIconSVG);
const DiscordIcon = getIconComponent('DiscordIcon', discordIconSVG);

const coralSocialHandles: [string, ReturnType<typeof getIconComponent>][] = [
  ['https://www.instagram.com/coral_fan/', InstagramIcon],
  ['https://twitter.com/coral__fan', TwitterIcon],
  ['https://discord.gg/eHdUVxMZG3', DiscordIcon],
];

const coralSocialLinksStyle = css`
  display: flex;
  gap: 10px;
`;

const socialLinksStyle = css`
  &:hover {
    filter: brightness(1.1);
    transform: scale(1.05);
  }
`;

export const CoralSocialLinks = () => (
  <span css={coralSocialLinksStyle}>
    {coralSocialHandles.map(([href, Icon], index) => (
      <Link href={href} key={index} css={socialLinksStyle} openInNewTab>
        <Icon />
      </Link>
    ))}
  </span>
);

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  gap: 20px;
`;
