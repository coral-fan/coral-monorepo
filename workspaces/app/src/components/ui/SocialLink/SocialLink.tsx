/* eslint-disable @next/next/no-img-element */
import { Link } from 'components/ui';
import { SocialHandles } from 'libraries/models';
import twitterSVG from './assets/twitter.svg';
import instagramSVG from './assets/instagram.svg';
import facebookSVG from './assets/facebook.svg';

type SocialType = keyof SocialHandles;

export interface SocialLinkProps {
  socialType: SocialType;
  username: string;
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
  }
};

export const SocialLink = ({ socialType, username }: SocialLinkProps) => (
  <Link href={getUrl({ socialType, username })} target="_blank">
    <img src={getSVG(socialType)} width={'auto'} height={'auto'} alt={''} />
  </Link>
);
