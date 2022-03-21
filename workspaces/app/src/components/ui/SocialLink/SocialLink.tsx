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
  username: string;
}

const socialInfoMap: Record<SocialType, [string, any]> = {
  twitter: ['https://twitter.com/', twitterSVG],
  instagram: ['https://instagram.com/', instagramSVG],
  facebook: ['https://facebook.com/', facebookSVG],
  soundcloud: ['https://soundcloud.com/', soundcloudSVG],
  tiktok: ['https://tiktok.com/@', tiktokSVG],
  spotify: ['https://open.spotify.com/user/', spotifySVG],
  discogs: ['https://discogs.com/user/', discogsSVG],
};

const Link = styled(LinkComponent)`
  display: flex;
  width: 30px;
  height: 30px;
`;

export const SocialLink = ({ socialType, username }: SocialLinkProps) => {
  const [url, svg] = socialInfoMap[socialType];
  return (
    <Link href={`${url}${username}`} target="_blank">
      <img src={svg} width={'auto'} height={'auto'} alt={''} />
    </Link>
  );
};
