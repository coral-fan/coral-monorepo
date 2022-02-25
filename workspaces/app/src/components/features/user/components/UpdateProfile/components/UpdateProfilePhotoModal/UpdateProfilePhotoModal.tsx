import { ChangeEventHandler, useCallback } from 'react';
import styled from '@emotion/styled';
import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsAuthenticated } from 'libraries/authentication';
import { Avatar, Button, Modal } from 'components/ui';

import { useIsUpdateProfilePhotoModalOpen, useUser } from 'components/features/user/hooks';
import { getObjectPosition } from './observables';
import { PREVIEW_SIZE } from './consts';
import { useOffsetPercentages, useScale, useUpdateProfilePhoto } from './hooks';

const Slider = styled.input`
  &:hover {
    cursor: pointer;
  }
`;

const EditableAvatar = styled(Avatar)`
  &:hover {
    cursor: move;
  }
`;

export const UpdateProfilePhotoModal = () => {
  const isAuthenticated = useIsAuthenticated();
  const isNetworkSupported = useIsNetworkSupported();
  const [, setIsModalOpen] = useIsUpdateProfilePhotoModalOpen();

  const [{ profilePhoto }] = useUser();

  const { scale, setScale, isScaleSame } = useScale(profilePhoto.scale);

  const handleRangeValueChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setScale(parseFloat(event.target.value));
    },
    [setScale]
  );

  const {
    src,
    handleImageFileChange,
    updateProfilePhoto,
    isProfilePhotoUpdating,
    isProfilePhotoSame,
  } = useUpdateProfilePhoto(profilePhoto.src);

  const { offsetPercentages, setOffsetPercentages, isOffsetPercentagesSame } = useOffsetPercentages(
    profilePhoto.offsetPercentages
  );

  const avatarRef = useCallback(
    (avatarWrapperElement) => {
      if (avatarWrapperElement !== null) {
        getObjectPosition(avatarWrapperElement, offsetPercentages).subscribe(setOffsetPercentages);
      }
    },
    [offsetPercentages, setOffsetPercentages]
  );

  if (!isAuthenticated || !isNetworkSupported) {
    return null;
  }

  return (
    <Modal onClick={() => setIsModalOpen(false)} variant={'close'}>
      <EditableAvatar
        size={PREVIEW_SIZE}
        offsetPercentages={offsetPercentages}
        scale={scale}
        src={src}
        ref={avatarRef}
      />
      <input type="file" accept="image/*" onChange={handleImageFileChange} />
      <Slider
        type="range"
        min={1}
        max={1.5}
        value={scale}
        onChange={handleRangeValueChange}
        step={0.01}
      />
      <Button
        onClick={() => updateProfilePhoto(offsetPercentages, scale)}
        loading={isProfilePhotoUpdating}
        disabled={isScaleSame && isOffsetPercentagesSame && isProfilePhotoSame}
      >
        Update Photo
      </Button>
    </Modal>
  );
};
