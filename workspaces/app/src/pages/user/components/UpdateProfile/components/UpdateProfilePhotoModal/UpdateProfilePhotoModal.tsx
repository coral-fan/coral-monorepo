import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsAuthenticated } from 'libraries/authentication';
import { Modal } from 'components/ui';
import { useIsUpdateProfilePhotoModalOpen } from 'pages/user/hooks';

export const UpdateProfilePhotoModal = () => {
  const isAuthenticated = useIsAuthenticated();
  const isNetworkSupported = useIsNetworkSupported();
  const [, setIsModalOpen] = useIsUpdateProfilePhotoModalOpen();

  if (!isAuthenticated || !isNetworkSupported) {
    return null;
  }

  return <Modal onClick={() => setIsModalOpen(false)} variant={'close'}></Modal>;
};
