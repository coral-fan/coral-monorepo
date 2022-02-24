import { ChangeEventHandler, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsAuthenticated } from 'libraries/authentication';
import { Avatar, Button, Modal, OffsetPercentages } from 'components/ui';

import { useIsUpdateProfilePhotoModalOpen, useUser } from 'components/features/user/hooks';
import { getObjectPosition } from './observables';
import { PREVIEW_SIZE } from './consts';
import { useUpdateProfilePhoto } from './hooks';

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

  const [scale, setScale] = useState(profilePhoto.scale);

  const isScaleSame = scale === profilePhoto.scale;

  const handleRangeValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setScale(parseFloat(event.target.value));
  };

  const {
    src,
    handleImageFileChange,
    updateProfilePhoto,
    isProfilePhotoUpdating,
    isProfilePhotoSame,
  } = useUpdateProfilePhoto(profilePhoto.src);

  const [offsetPercentages, setOffsetPercentages] = useState<OffsetPercentages>(
    profilePhoto.offsetPercentages
  );

  const isOffsetPercentagesSame = offsetPercentages.every(
    (offsetPercentage, i) => offsetPercentage === profilePhoto.offsetPercentages[i]
  );

  const avatarRef = useCallback((avatarWrapperElement) => {
    if (avatarWrapperElement !== null) {
      getObjectPosition(avatarWrapperElement, offsetPercentages).subscribe(setOffsetPercentages);
    }
  }, []);

  if (!isAuthenticated || !isNetworkSupported) {
    return null;
  }

  const handleUpdateProfilePhoto = () => {
    updateProfilePhoto(offsetPercentages, scale);
  };

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
        onClick={handleUpdateProfilePhoto}
        loading={isProfilePhotoUpdating}
        disabled={isScaleSame && isOffsetPercentagesSame && isProfilePhotoSame}
      >
        Update Photo
      </Button>
    </Modal>
  );
};
