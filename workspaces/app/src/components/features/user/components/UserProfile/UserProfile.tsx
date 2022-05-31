import { EditAvatarButton, EditProfileLinkButton } from './components';
import {
  useIsUpdateProfilePhotoModalOpen,
  useIsUpdateProfileInfoModalOpen,
  useUser,
  useIsCurrentUser,
} from '../../hooks';
import { useCallback, useMemo } from 'react';
import { UpdateProfileInfoModal } from '../UpdateProfile/components/UpdateProfileInfoModal';
import { UpdateProfilePhotoModal } from '../UpdateProfile/components/UpdateProfilePhotoModal';
import { Profile } from 'components/ui';
import { Assets } from '../Assets';
import { Asset } from 'libraries/models';

interface UserProfileProps {
  assets: Asset[];
}

export const UserProfile = ({ assets }: UserProfileProps) => {
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

  const editAvatar = useMemo(
    () =>
      isCurrentUser && (
        <>
          <EditAvatarButton onClick={openUpdateProfilePhotoModal} />
          {isUpdateProfilePhotoModalOpen && <UpdateProfilePhotoModal />}
        </>
      ),
    [isCurrentUser, isUpdateProfilePhotoModalOpen, openUpdateProfilePhotoModal]
  );

  const editProfileInfo = useMemo(
    () =>
      isCurrentUser && (
        <>
          <EditProfileLinkButton onClick={openUpdateProfileInfoModal}>
            Update Profile
          </EditProfileLinkButton>
          {isUpdateProfileInfoModalOpen && <UpdateProfileInfoModal />}
        </>
      ),
    [isCurrentUser, isUpdateProfileInfoModalOpen, openUpdateProfileInfoModal]
  );

  return (
    <Profile
      username={username}
      profilePhoto={profilePhoto}
      bio={bio}
      socialHandles={socialHandles}
      editAvatar={editAvatar}
      editProfileInfo={editProfileInfo}
      items={<Assets assets={assets} />}
    />
  );
};
