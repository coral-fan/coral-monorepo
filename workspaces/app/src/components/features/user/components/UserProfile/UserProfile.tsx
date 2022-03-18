import styled from '@emotion/styled';
import { Avatar, LinkButton } from 'components/ui';
import {
  useIsUpdateProfilePhotoModalOpen,
  useIsUpdateProfileInfoModalOpen,
  useUser,
} from 'components/features/user/hooks';
import { EditAvatarButton as EditAvatarButtonComponent } from '../EditAvatarButton';
import { useCallback } from 'react';
import { UpdateProfileInfoModal } from '../UpdateProfile/components/UpdateProfileInfoModal';
import { UpdateProfilePhotoModal } from '../UpdateProfile/components/UpdateProfilePhotoModal';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';
import { useRouter } from 'next/router';
import { useIsDesktop } from 'libraries/window';
import { useUserUid } from 'libraries/models';
import { SocialLinks } from 'components/features/components/SocialLinks';

const { size, line_height, letter_spacing, weight } = tokens.font;

const ProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0 16px;
`;

const MainProfileContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    flex-direction: row;
    gap: 30px;
  }
`;

const AvatarContainer = styled.div`
  width: fit-content;
  position: relative;
`;

const EditAvatarButton = styled(EditAvatarButtonComponent)`
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: 0;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    right: 15px;
  }
`;

const UsernameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    align-items: flex-start;
  }
`;

const EditProfileLinkButton = styled(LinkButton)`
  font-size: ${size.xs};
  letter-spacing: ${letter_spacing.xs};
  line-height: ${line_height.xs};
  text-transform: uppercase;
  text-decoration: underline;
  padding: 4px 0px;
`;

const Username = styled.span`
  font-size: ${size.xl};
  letter-spacing: ${letter_spacing.xl};
  line-height: ${line_height.xl};
  font-weight: ${weight.bold};
`;

const Bio = styled.div`
  font-size: ${size.sm};
  letter-spacing: ${letter_spacing.sm};
  line-height: ${line_height.sm};
  font-weight: ${weight.normal};
`;

const UserContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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
