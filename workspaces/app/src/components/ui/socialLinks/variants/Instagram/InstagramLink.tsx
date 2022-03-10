import { BaseSocialLink } from '../../BaseSocialLink';
import instagramSVG from './instagram.svg';

export interface InstagramLinkProp {
  instagramUsername: string;
}

const baseUrl = 'https://instagram.com/';

export const InstagramLink = ({ instagramUsername }: InstagramLinkProp) => {
  const url = `${baseUrl}/${instagramUsername}`;

  return <BaseSocialLink href={url} svg={instagramSVG} />;
};
