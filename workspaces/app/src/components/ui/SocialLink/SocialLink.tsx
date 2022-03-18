/* eslint-disable @next/next/no-img-element */
import { Link as LinkComponent } from 'components/ui';
import { NullableString, SocialHandles } from 'libraries/models';
import twitterSVG from './assets/twitter.svg';
import instagramSVG from './assets/instagram.svg';
import facebookSVG from './assets/facebook.svg';
import soundcloudSVG from './assets/soundcloud.svg';
import tiktokSVG from './assets/tiktok.svg';
import spotifySVG from './assets/spotify.svg';
import discogsSVG from './assets/discogs.svg';
import styled from '@emotion/styled';

export type SocialType = keyof SocialHandles;

export interface SocialLinkProps {
  socialType: SocialType;
  username: NullableString;
}

// TODO: flesh out return statements
const getUrl = ({ socialType, username }: SocialLinkProps) => {
  switch (socialType) {
    case 'twitter':
      return `https://twitter.com/${username}`;
    case 'instagram':
      return `https://instagram.com/${username}`;
    case 'facebook':
      return `https://facebook.com/${username}`;
    case 'soundcloud':
      return `https://soundcloud.com/${username}`;
    case 'tiktok':
      return `https://tiktok.com/@${username}`;
    case 'spotify':
      return `https://open.spotify.com/user/${username}`;
    case 'discogs':
      return `https://discogs.com/user/${username}`;
    default:
      return '#';
  }
};

const getSVG = (socialType: SocialType) => {
  switch (socialType) {
    case 'twitter':
      return twitterSVG;
    case 'instagram':
      return instagramSVG;
    case 'facebook':
      return facebookSVG;
    case 'soundcloud':
      return soundcloudSVG;
    case 'tiktok':
      return tiktokSVG;
    case 'spotify':
      return spotifySVG;
    case 'discogs':
      return discogsSVG;
  }
};

const Link = styled(LinkComponent)`
  display: flex;
  width: 30px;
  height: 30px;
`;

export const SocialLink = ({ socialType, username }: SocialLinkProps) => (
  <Link href={getUrl({ socialType, username })} target="_blank">
    <img src={getSVG(socialType)} width={'auto'} height={'auto'} alt={''} />
  </Link>
);
