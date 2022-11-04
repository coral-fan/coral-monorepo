import { Tag } from 'components/features/artist/components/ArtistProfile';
import { Avatar, Button } from 'components/ui';
import {
  AvatarContainer,
  Bio,
  MainProfileContainer,
  PageContainer,
  ProfileContainer,
  SocialLinks,
  UserContentContainer,
  Username,
  UsernameContainer,
} from 'components/ui/profile/Profile/components';
import { Artist } from 'libraries/models';
import { useIsDesktop } from 'libraries/window';
import { TwitterShareButton } from 'react-share';

const artist: Artist = {
  id: 'tayla-parx',
  name: 'Tayla Parx',
  bio: 'Hey there. I make beats you all love to listen to. Sometimes I do other things like drop cool NFTs.',
  profilePhoto: {
    offsetPercentages: [0, 0] as [number, number],
    scale: 1,
    src: '/images/default-profile-photo.png',
  },
  socialHandles: {
    instagram: 'taylaparx',
    spotify: '1LzWWI9v4UKdbBgz8fqi15',
    twitter: 'TAYLAPARX',
  },
  quote: null,
  collections: [],
};

export default function TaylaParxArtistPage() {
  const { name, bio, profilePhoto, socialHandles } = artist;
  const isDesktop = useIsDesktop();
  const avatarSize = isDesktop ? 200 : 125;

  //   add logic to check if user owns nft

  const tweetText = `Join me in @TAYLAPARX community on @coral__fan.\n\nWatch the very special version of her new music video "Rich."\n\nhttps://www.coral.fan/\n\n`;
  const socialShareId = `abc123`;

  return (
    <PageContainer>
      <ProfileContainer>
        <MainProfileContainer>
          <AvatarContainer>
            <Avatar size={avatarSize} {...profilePhoto} />
            <Tag>Artist</Tag>
          </AvatarContainer>
          <UsernameContainer>
            <Username>{name}</Username>
          </UsernameContainer>
        </MainProfileContainer>
        <UserContentContainer>
          <Bio
            dangerouslySetInnerHTML={{
              __html: bio,
            }}
          />
          <SocialLinks socialHandles={socialHandles} />
          <TwitterShareButton title={tweetText} url={socialShareId}>
            <Button>Share To Earn</Button>
          </TwitterShareButton>
        </UserContentContainer>
      </ProfileContainer>
    </PageContainer>
  );
}
//
