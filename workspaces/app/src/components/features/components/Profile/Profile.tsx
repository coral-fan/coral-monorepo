import { Avatar } from 'components/ui';
import {
  ProfileContainer,
  MainProfileContainer,
  AvatarContainer,
  UsernameContainer,
  Username,
  UserContentContainer,
  Bio,
} from './components';
import { useIsDesktop } from 'libraries/window';
import { SocialLinks } from './components/SocialLinks';
import { NullableString, Photo, SocialHandles } from 'libraries/models';

interface ProfileProps {
  username: string;
  profilePhoto: Photo;
  bio: NullableString;
  socialHandles: SocialHandles;
  editAvatar?: JSX.Element | false;
  editProfileInfo?: JSX.Element | false;
}

export const Profile = ({
  username,
  profilePhoto,
  bio,
  socialHandles,
  editAvatar,
  editProfileInfo,
}: ProfileProps) => {
  const isDesktop = useIsDesktop();
  const avatarSize = isDesktop ? 200 : 125;

  return (
    <ProfileContainer>
      <MainProfileContainer>
        <AvatarContainer>
          <Avatar size={avatarSize} {...profilePhoto} />
          {editAvatar}
        </AvatarContainer>
        <UsernameContainer>
          <Username>{username}</Username>
          {editProfileInfo}
        </UsernameContainer>
      </MainProfileContainer>
      <UserContentContainer>
        <Bio>{bio}</Bio>
        <SocialLinks socialHandles={socialHandles} />
      </UserContentContainer>
    </ProfileContainer>
  );
};
