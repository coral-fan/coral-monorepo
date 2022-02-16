import { Button } from 'components/ui';
import {
  useIsUpdateProfileInfoModalOpen,
  useIsUpdateProfilePhotoModalOpen,
} from 'pages/user/hooks';
import { UpdateProfilePhotoModal, UpdateProfileInfoModal } from './components';

export const UpdateProfile = () => {
  const [isUpdateProfileInfoModalOpen, setIsProfileInfoModalOpen] =
    useIsUpdateProfileInfoModalOpen();

  const [isUpdateProfilePhotoModalOpen, setIsUpdateProfilePhotoOpen] =
    useIsUpdateProfilePhotoModalOpen();
  return (
    <>
      <div>
        <Button onClick={() => setIsUpdateProfilePhotoOpen(true)}>Update Profile Photo</Button>
        {isUpdateProfilePhotoModalOpen ? <UpdateProfilePhotoModal /> : null}
      </div>
      <div>
        <Button onClick={() => setIsProfileInfoModalOpen(true)}>Update Profile</Button>
        {isUpdateProfileInfoModalOpen ? <UpdateProfileInfoModal /> : null}
      </div>
    </>
  );
};
