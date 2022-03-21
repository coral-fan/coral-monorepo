import { Avatar } from 'components/ui';
import {
  ProfileContainer,
  MainProfileContainer,
  AvatarContainer,
  EditAvatarButton,
  UsernameContainer,
  Username,
  EditProfileLinkButton,
  UserContentContainer,
  Bio,
} from './components';
import {
  useIsUpdateProfilePhotoModalOpen,
  useIsUpdateProfileInfoModalOpen,
  useUser,
  useIsCurrentUser,
} from 'components/features/user/hooks';
import { useCallback } from 'react';
import { UpdateProfileInfoModal } from '../UpdateProfile/components/UpdateProfileInfoModal';
import { UpdateProfilePhotoModal } from '../UpdateProfile/components/UpdateProfilePhotoModal';
import { useIsDesktop } from 'libraries/window';
import { SocialLinks } from 'components/features/components/SocialLinks';

export const UserProfile = () => {
  const isDesktop = useIsDesktop();
  const [{ username, profilePhoto, socialHandles, bio }] = useUser();
  const isCurrentUser = useIsCurrentUser();

  const [isUpdateProfilePhotoModalOpen, setIsUpdateProfilePhotoOpen] =
    useIsUpdateProfilePhotoModalOpen();
  const [isUpdateProfileInfoModalOpen, setIsProfileInfoModalOpen] =
    useIsUpdateProfileInfoModalOpen();

  const openUpdateProfilePhotoModal = useCallback(
    () => setIsUpdateProfilePhotoOpen(true),
    [setIsUpdateProfilePhotoOpen]
  );

  const openUpdateProfileInfoModal = useCallback(
    () => setIsProfileInfoModalOpen(true),
    [setIsProfileInfoModalOpen]
  );

  const avatarSize = isDesktop ? 200 : 125;

  const EditAvatar = () =>
    isCurrentUser ? (
      <>
        <EditAvatarButton onClick={openUpdateProfilePhotoModal} />
        {isUpdateProfilePhotoModalOpen && <UpdateProfilePhotoModal />}
      </>
    ) : null;

  const EditProfile = () =>
    isCurrentUser ? (
      <>
        <EditProfileLinkButton onClick={openUpdateProfileInfoModal}>
          Update Profile
        </EditProfileLinkButton>
        {isUpdateProfileInfoModalOpen && <UpdateProfileInfoModal />}
      </>
    ) : null;

  return (
    <ProfileContainer>
      <MainProfileContainer>
        <AvatarContainer>
          <Avatar size={avatarSize} {...profilePhoto} />
          <EditAvatar />
        </AvatarContainer>
        <UsernameContainer>
          <Username>{username}</Username>
          <EditProfile />
        </UsernameContainer>
      </MainProfileContainer>
      <UserContentContainer>
        <Bio>{bio}</Bio>
        <SocialLinks socialHandles={socialHandles} />
      </UserContentContainer>
    </ProfileContainer>
  );
};
