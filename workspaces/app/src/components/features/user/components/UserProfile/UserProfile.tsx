import { EditAvatarButton, EditProfileLinkButton } from './components';
import {
  useIsUpdateProfilePhotoModalOpen,
  useIsUpdateProfileInfoModalOpen,
  useUser,
  useIsCurrentUser,
} from '../../hooks';
import { useCallback } from 'react';
import { UpdateProfileInfoModal } from '../UpdateProfile/components/UpdateProfileInfoModal';
import { UpdateProfilePhotoModal } from '../UpdateProfile/components/UpdateProfilePhotoModal';

import { Profile } from '../../../components/Profile';

export const UserProfile = () => {
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

  const editAvatar = isCurrentUser && (
    <>
      <EditAvatarButton onClick={openUpdateProfilePhotoModal} />
      {isUpdateProfilePhotoModalOpen && <UpdateProfilePhotoModal />}
    </>
  );

  const editProfileInfo = isCurrentUser && (
    <>
      <EditProfileLinkButton onClick={openUpdateProfileInfoModal}>
        Update Profile
      </EditProfileLinkButton>
      {isUpdateProfileInfoModalOpen && <UpdateProfileInfoModal />}
    </>
  );

  return (
    <Profile
      username={username}
      profilePhoto={profilePhoto}
      bio={bio}
      socialHandles={socialHandles}
      editAvatar={editAvatar}
      editProfileInfo={editProfileInfo}
    />
  );
};
