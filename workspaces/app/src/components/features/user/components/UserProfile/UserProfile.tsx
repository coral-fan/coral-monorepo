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
} from 'components/features/user/hooks';
import { useCallback } from 'react';
import { UpdateProfileInfoModal } from '../UpdateProfile/components/UpdateProfileInfoModal';
import { UpdateProfilePhotoModal } from '../UpdateProfile/components/UpdateProfilePhotoModal';
import { useRouter } from 'next/router';
import { useIsDesktop } from 'libraries/window';
import { useUserUid } from 'libraries/models';
import { SocialLinks } from 'components/features/components/SocialLinks';

export const UserProfile = () => {
  const { userProfileId } = useRouter().query;

  if (typeof userProfileId !== 'string') {
    throw Error('userProfileId must be of type string');
  }

  const isDesktop = useIsDesktop();
  const [{ username, profilePhoto, socialHandles, bio }] = useUser();
  const currentUserUid = useUserUid();

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
  const isCurrentUser = currentUserUid === userProfileId;

  return (
    <ProfileContainer>
      <MainProfileContainer>
        <AvatarContainer>
          <Avatar size={avatarSize} {...profilePhoto} />
          {isCurrentUser && (
            <>
              <EditAvatarButton onClick={openUpdateProfilePhotoModal} />
              {isUpdateProfilePhotoModalOpen ? <UpdateProfilePhotoModal /> : null}
            </>
          )}
        </AvatarContainer>
        <UsernameContainer>
          <Username>{username}</Username>
          {isCurrentUser && (
            <>
              <EditProfileLinkButton onClick={openUpdateProfileInfoModal}>
                Update Profile
              </EditProfileLinkButton>
              {isUpdateProfileInfoModalOpen ? <UpdateProfileInfoModal /> : null}
            </>
          )}
        </UsernameContainer>
      </MainProfileContainer>
      <UserContentContainer>
        <Bio>{bio}</Bio>
        <SocialLinks socialHandles={socialHandles} />
      </UserContentContainer>
    </ProfileContainer>
  );
};
