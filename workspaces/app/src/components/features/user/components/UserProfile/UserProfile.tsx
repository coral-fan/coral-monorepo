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
import { ConditionalSpinner, Profile } from 'components/ui';
import { Assets } from '../Assets';
import { Asset } from 'libraries/models';
import { useIsReferralUser, useReferralUserData } from 'libraries/models/referral/hooks';
import { Points } from '../Points';
import tokens from 'styles/tokens';

interface UserProfileProps {
  assets: Asset[];
}

export const UserProfile = ({ assets }: UserProfileProps) => {
  const [{ id, username, profilePhoto, socialHandles, bio }] = useUser();
  const isCurrentUser = useIsCurrentUser();
  const isReferralUser = useIsReferralUser();
  const { referralUserData, isLoading } = useReferralUserData(id);

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

  const referralContent = useMemo(() => {
    const pointsEarned = (referralUserData && referralUserData.pointsBalance) || 0;
    return (
      isCurrentUser &&
      isReferralUser && (
        <ConditionalSpinner
          size={'60px'}
          color={tokens.background.color.brand}
          center
          loading={isLoading}
        >
          <Points pointsEarned={pointsEarned} />
        </ConditionalSpinner>
      )
    );
  }, [isLoading, isCurrentUser, isReferralUser, referralUserData]);

  return (
    <Profile
      username={username}
      profilePhoto={profilePhoto}
      bio={bio}
      socialHandles={socialHandles}
      editAvatar={editAvatar}
      editProfileInfo={editProfileInfo}
      items={<Assets assets={assets} />}
      referralContent={referralContent}
    />
  );
};
