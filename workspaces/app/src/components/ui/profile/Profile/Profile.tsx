import { Avatar } from 'components/ui';
import {
  ProfileContainer,
  MainProfileContainer,
  AvatarContainer,
  UsernameContainer,
  Username,
  UserContentContainer,
  Bio,
  Quote,
  PageContainer,
} from './components';
import { useIsDesktop } from 'libraries/window';
import { SocialLinks } from './components/SocialLinks';
import { NullableString, Photo, SocialHandles } from 'libraries/models';

interface ProfileProps {
  username: string;
  profilePhoto: Photo;
  bio: NullableString;
  quote?: NullableString;
  socialHandles: SocialHandles;
  editAvatar?: JSX.Element | false;
  editProfileInfo?: JSX.Element | false;
  artistTag?: JSX.Element;
  collections?: JSX.Element;
  assets?: JSX.Element;
}

export const Profile = ({
  username,
  profilePhoto,
  bio,
  quote,
  socialHandles,
  editAvatar,
  editProfileInfo,
  artistTag,
  collections,
  assets,
}: ProfileProps) => {
  const isDesktop = useIsDesktop();
  const avatarSize = isDesktop ? 200 : 125;

  return (
    <PageContainer>
      <ProfileContainer>
        <MainProfileContainer>
          <AvatarContainer>
            <Avatar size={avatarSize} {...profilePhoto} />
            {editAvatar}
            {artistTag}
          </AvatarContainer>
          <UsernameContainer>
            <Username>{username}</Username>
            {editProfileInfo}
          </UsernameContainer>
        </MainProfileContainer>
        <UserContentContainer>
          <Bio>{bio}</Bio>
          {quote && isDesktop && <Quote>{quote}</Quote>}
          <SocialLinks socialHandles={socialHandles} />
        </UserContentContainer>
      </ProfileContainer>
      {collections}
      {assets}
    </PageContainer>
  );
};
