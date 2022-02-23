import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsAuthenticated } from 'libraries/authentication';
import { Avatar, Button, Modal, PercentageOffsets } from 'components/ui';

import { useIsUpdateProfilePhotoModalOpen } from 'components/features/user/hooks';
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

  const avatarRef = useRef<HTMLDivElement>(null);
  const [[x, y], objectPosition] = useState<PercentageOffsets>([0, 0]);

  useEffect(() => {
    if (avatarRef.current) {
      getObjectPosition(avatarRef.current, [x, y]).subscribe(objectPosition);
    }
  }, []);

  const [scale, setScale] = useState(1);

  const handleRangeValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setScale(parseFloat(event.target.value));
  };

  if (!isAuthenticated || !isNetworkSupported) {
    return null;
  }

  return (
    <Modal onClick={() => setIsModalOpen(false)} variant={'close'}>
      <Avatar size={PREVIEW_SIZE} percentageOffsets={[x, y]} scale={scale} ref={avatarRef} />
      <Button>Upload Photo</Button>
      <Slider type="range" min={1} max={1.5} onChange={handleRangeValueChange} step={0.01} />
      <Button>Update Photo</Button>
    </Modal>
  );
};
