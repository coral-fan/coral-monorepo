import { Button } from 'components/ui';
import { useIsUpdateProfileInfoModalOpen } from 'pages/user/hooks';
import { UpdateProfileInfoModal } from './UpdateProfileInfoModal/UpdateProfileInfoModal';

export const UpdateProfile = () => {
  const [isUpdateProfileInfoModalOpen, setIsProfileInfoModalOpen] =
    useIsUpdateProfileInfoModalOpen();
  return (
    <>
      <div>
        <Button onClick={() => setIsProfileInfoModalOpen(true)}>Update Profile</Button>
        {isUpdateProfileInfoModalOpen ? <UpdateProfileInfoModal /> : null}
      </div>
    </>
  );
};
