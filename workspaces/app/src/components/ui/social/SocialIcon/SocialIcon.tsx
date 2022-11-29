/* eslint-disable @next/next/no-img-element */
import twitterSVG from './assets/twitter.svg';
import instagramSVG from './assets/instagram.svg';
import facebookSVG from './assets/facebook.svg';
import soundcloudSVG from './assets/soundcloud.svg';
import tiktokSVG from './assets/tiktok.svg';
import spotifySVG from './assets/spotify.svg';
import discogsSVG from './assets/discogs.svg';
import youtubeSVG from './assets/youtube.svg';

import { SocialHandles } from 'libraries/models';
import { getIconComponent } from 'components/ui/icons/utils';

type SocialType = keyof SocialHandles;

export interface SocialIconProp {
  socialType: SocialType;
}

const socialSVGs: Record<SocialType, string> = {
  twitter: twitterSVG,
  instagram: instagramSVG,
  facebook: facebookSVG,
  soundcloud: soundcloudSVG,
  tiktok: tiktokSVG,
  spotify: spotifySVG,
  discogs: discogsSVG,
  youtube: youtubeSVG,
};

export const SocialIcon = ({ socialType }: SocialIconProp) => {
  const svg = socialSVGs[socialType];
  const Icon = getIconComponent(`${socialType}Avatar`, svg);
  return <Icon />;
};
