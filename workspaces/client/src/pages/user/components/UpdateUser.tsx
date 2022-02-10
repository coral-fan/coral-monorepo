import { User } from 'libraries/models';
import { Button } from 'components/ui';
import { UpdateUserModal } from './EditUserModal/UpdateProfileModal';
import { Dispatch, SetStateAction, useState } from 'react';
import { EditableUserFields } from '../types';

export interface UpdateUserProps extends EditableUserFields {
  setUser: Dispatch<SetStateAction<User>>;
}
export const UpdateUser = (props: UpdateUserProps) => {
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsEditUserModalOpen(true)}>Update Profile</Button>
      {isEditUserModalOpen ? (
        <UpdateUserModal {...props} setIsModalOpen={setIsEditUserModalOpen} />
      ) : null}
    </>
  );
};
