import { BaseSocialLink } from '../../BaseSocialLink';
import twitterSVG from './twitter.svg';

export interface TwitterLinkProp {
  twitterUsername: string;
}

const baseUrl = 'https://twitter.com/';

export const TwitterLink = ({ twitterUsername }: TwitterLinkProp) => {
  const url = `${baseUrl}/${twitterUsername}`;

  return <BaseSocialLink href={url} svg={twitterSVG} />;
};
