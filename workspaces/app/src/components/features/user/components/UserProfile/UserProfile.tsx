import styled from '@emotion/styled';
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
import { useIsReferralUser, useReferralUserData } from 'libraries/models/referral/hooks';
import { Points } from '../Points';
import tokens from 'styles/tokens';
import { Button, Modal, ConditionalSpinner, Profile } from 'components/ui';
import { Assets } from '../Assets';
import { Asset } from 'libraries/models';
import { useClipboard, useModal } from 'libraries/utils';

const ClaimButton = styled(Button)`
  height: 45px;
  margin-top: 10px;
  padding: 0 15px;
`;

interface UserProfileProps {
  assets: Asset[];
  doesUserHaveUnclaimedReward: boolean;
}

export const UserProfile = ({ assets, doesUserHaveUnclaimedReward }: UserProfileProps) => {
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

  const { isModalOpen, openModal, closeModal } = useModal();

  const copyUsernameToClipboard = useClipboard(() => username, 'Username copied to clipboard!');

  const cta = useMemo(
    () =>
      isCurrentUser &&
      doesUserHaveUnclaimedReward && (
        <>
          <ClaimButton onClick={openModal}>Claim Reward</ClaimButton>
          {isModalOpen && (
            <Modal title="Claim Reward" onClick={closeModal}>
              <>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum
                </p>
                <Button onClick={copyUsernameToClipboard}>Copy Username</Button>
              </>
            </Modal>
          )}
        </>
      ),
    [
      isCurrentUser,
      doesUserHaveUnclaimedReward,
      openModal,
      isModalOpen,
      closeModal,
      copyUsernameToClipboard,
    ]
  );

  return (
    <Profile
      username={username}
      profilePhoto={profilePhoto}
      bio={bio}
      socialHandles={socialHandles}
      editAvatar={editAvatar}
      editProfileInfo={editProfileInfo}
      cta={cta}
      items={<Assets assets={assets} />}
      referralContent={referralContent}
    />
  );
};
