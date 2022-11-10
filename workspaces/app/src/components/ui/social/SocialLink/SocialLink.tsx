/* eslint-disable @next/next/no-img-element */
import { Link as LinkComponent } from 'components/ui';
import { SocialHandles } from 'libraries/models';
import styled from '@emotion/styled';
import { SocialIcon } from '../SocialIcon';

export type SocialType = keyof SocialHandles;

export interface SocialLinkProps {
  socialType: SocialType;
  username: string;
}

const socialLinksMap: Record<SocialType, string> = {
  twitter: 'https://twitter.com/',
  instagram: 'https://instagram.com/',
  facebook: 'https://facebook.com/',
  soundcloud: 'https://soundcloud.com/',
  tiktok: 'https://tiktok.com/@',
  spotify: 'https://open.spotify.com/artist/',
  discogs: 'https://discogs.com/user/',
};

const Link = styled(LinkComponent)`
  display: flex;
  width: 35px;
  height: 35px;
`;

export const SocialLink = ({ socialType, username }: SocialLinkProps) => {
  const url = socialLinksMap[socialType];
  return (
    <Link href={`${url}${username}`} openInNewTab>
      <SocialIcon socialType={socialType} />
    </Link>
  );
};
