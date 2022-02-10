import { User } from 'libraries/models';
import { Button } from 'components/ui';
import { UpdateProfileModal } from './UpdateProfileModal/UpdateProfileModal';
import { Dispatch, SetStateAction, useState } from 'react';
import { EditableUserFields } from '../types';

export interface UpdateProfileProps extends EditableUserFields {
  setUser: Dispatch<SetStateAction<User>>;
}
export const UpdateProfile = (props: UpdateProfileProps) => {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsEditUserModalOpen(true)}>Update Profile</Button>
      {isEditUserModalOpen ? (
        <UpdateProfileModal {...props} setIsModalOpen={setIsEditUserModalOpen} />
      ) : null}
    </>
  );
};
