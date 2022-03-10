import { BaseSocialLink } from '../../BaseSocialLink';
import facebookSVG from './facebook.svg';

export interface FacebookLinkProp {
  facebookUsername: string;
}

const baseUrl = 'https://facebook.com/';

export const FacebookLink = ({ facebookUsername }: FacebookLinkProp) => {
  const url = `${baseUrl}/${facebookUsername}`;

  return <BaseSocialLink href={url} svg={facebookSVG} />;
};
