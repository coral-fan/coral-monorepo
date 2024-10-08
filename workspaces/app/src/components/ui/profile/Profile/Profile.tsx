import { Avatar } from 'components/ui';
import {
  ProfileContainer,
  MainProfileContainer,
  AvatarContainer,
  UsernameContainer,
  Username,
  UserContentContainer,
  Bio,
  PageContainer,
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
  cta?: JSX.Element | false;
  artistTag?: JSX.Element;
  items?: JSX.Element;
  referralContent?: JSX.Element | false;
}

export const Profile = ({
  username,
  profilePhoto,
  bio,
  socialHandles,
  editAvatar,
  editProfileInfo,
  cta,
  artistTag,
  items,
  referralContent,
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
            {cta}
          </UsernameContainer>
        </MainProfileContainer>
        <UserContentContainer>
          {/* TODO: quick and dirty fix to be able to add arbitrary formatting. fix this in the future */}
          {artistTag !== undefined && bio ? (
            <Bio
              dangerouslySetInnerHTML={{
                __html: bio,
              }}
            />
          ) : (
            <Bio>{bio}</Bio>
          )}
          <SocialLinks socialHandles={socialHandles} />
        </UserContentContainer>
        {referralContent}
      </ProfileContainer>
      {items}
    </PageContainer>
  );
};
