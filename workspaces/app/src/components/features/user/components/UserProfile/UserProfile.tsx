import styled from '@emotion/styled';
import { EditAvatarButton, EditProfileLinkButton } from './components';
import {
  useIsUpdateProfilePhotoModalOpen,
  useIsUpdateProfileInfoModalOpen,
  useUser,
  useIsCurrentUser,
} from '../../hooks';
import { useCallback, useMemo, useState } from 'react';
import { UpdateProfileInfoModal } from '../UpdateProfile/components/UpdateProfileInfoModal';
import { UpdateProfilePhotoModal } from '../UpdateProfile/components/UpdateProfilePhotoModal';
import {
  useIsEarnUser,
  useReferralUserData,
  useUserReferralRedemptionDocumentAdded,
} from 'libraries/models/earn/hooks';
import { Points } from '../Points';
import { PointsRedemptionModal } from '../PointsRedemptionModal';
import { Button, Modal, Link, Profile } from 'components/ui';
import { Assets } from '../Assets';
import { Asset } from 'libraries/models';
import { useClipboard, useModal } from 'libraries/utils';
import { css } from '@emotion/react';

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
  const [showPointsRedemptionModal, setShowPointsRedemptionModal] = useState(false);
  const [{ id, username, profilePhoto, socialHandles, bio }] = useUser();
  const isCurrentUser = useIsCurrentUser();
  const isReferralUser = useIsEarnUser();
  const { referralUserData } = useReferralUserData(id);
  const pointsRedemptionReturnData = useUserReferralRedemptionDocumentAdded(id);

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

  const openPointsRedemptionModal = useCallback(
    () => setShowPointsRedemptionModal(true),
    [setShowPointsRedemptionModal]
  );

  const closePointsRedemptionModal = useCallback(
    () => setShowPointsRedemptionModal(false),
    [setShowPointsRedemptionModal]
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

  const pointsEarned = useMemo(
    () => (referralUserData && referralUserData.pointsBalance) || 0,
    [referralUserData]
  );

  const referralContent = useMemo(() => {
    return (
      isCurrentUser &&
      isReferralUser && (
        <Points
          handleRedemptionButtonClick={openPointsRedemptionModal}
          pointsEarned={pointsEarned}
        />
      )
    );
  }, [isCurrentUser, isReferralUser, pointsEarned, openPointsRedemptionModal]);

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
                  Thank you for being one of the first to sign up on Coral. To show our
                  appreciation, we will send $10 in AVAX to the wallet associated with your Coral
                  account. AVAX is a token on the Avalanche blockchain so do not send this to an
                  address on another blockchain.
                  <br />
                  <br />
                  To claim your $10, simply copy your Coral username and paste it in the{' '}
                  <Link
                    href="https://discord.com/invite/qYbRMd7BGd"
                    css={css`
                      text-decoration: underline;
                    `}
                    openInNewTab
                  >
                    #introductions channel in our Discord
                  </Link>
                  . Once you have done this, we will send you your tokens.
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
    <>
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
      {showPointsRedemptionModal && isReferralUser && (
        <PointsRedemptionModal
          closeModal={closePointsRedemptionModal}
          pointsRedemptionReturnData={pointsRedemptionReturnData}
          redemptionAmount={pointsEarned}
        />
      )}
    </>
  );
};
