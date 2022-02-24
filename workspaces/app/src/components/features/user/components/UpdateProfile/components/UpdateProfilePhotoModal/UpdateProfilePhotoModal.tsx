import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsAuthenticated } from 'libraries/authentication';
import { Avatar, Button, Modal, OffsetPercentages } from 'components/ui';

import { useIsUpdateProfilePhotoModalOpen, useUser } from 'components/features/user/hooks';
import { getObjectPosition } from './observables';
import { PREVIEW_SIZE } from './consts';

const Slider = styled.input`
  &:hover {
    cursor: pointer;
  }
`;

export const UpdateProfilePhotoModal = () => {
  const isAuthenticated = useIsAuthenticated();
  const isNetworkSupported = useIsNetworkSupported();
  const [, setIsModalOpen] = useIsUpdateProfilePhotoModalOpen();

  const [{ profilePhoto }] = useUser();

  const avatarRef = useRef<HTMLDivElement>(null);
  const [offsetPercentages, setOffsetPercentages] = useState<OffsetPercentages>(
    profilePhoto.offsetPercentages
  );

  useEffect(() => {
    if (avatarRef.current) {
      getObjectPosition(avatarRef.current, offsetPercentages).subscribe(setOffsetPercentages);
    }
  }, []);

  const [scale, setScale] = useState(profilePhoto.scale);

  const handleRangeValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setScale(parseFloat(event.target.value));
  };

  if (!isAuthenticated || !isNetworkSupported) {
    return null;
  }

  return (
    <Modal onClick={() => setIsModalOpen(false)} variant={'close'}>
      <Avatar
        size={PREVIEW_SIZE}
        offsetPercentages={offsetPercentages}
        scale={scale}
        src={profilePhoto.src}
        ref={avatarRef}
      />
      <Button>Upload Photo</Button>
      <Slider type="range" min={1} max={1.5} onChange={handleRangeValueChange} step={0.01} />
      <Button>Update Photo</Button>
    </Modal>
  );
};
