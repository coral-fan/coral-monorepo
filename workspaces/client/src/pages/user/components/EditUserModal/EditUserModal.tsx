import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsAuthenticated } from 'libraries/authentication';
import { Modal, Button, Input, Avatar } from 'components/ui';

import { AvatarContainer, AvatarWrapper, EditUserForm, InputsContainer } from './components';

import { useEditUserForm } from './hooks';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { User } from 'libraries/models';

type NonEditableUserFields = 'notifications' | 'assets';

type EditUserModalProps = Omit<User, NonEditableUserFields> & {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const EditUserModal = ({
  username,
  email,
  profilePhoto,
  creditCardInformation,
  setIsModalOpen,
}: EditUserModalProps) => {
  const isAuthenticated = useIsAuthenticated();
  const isNetworkSupported = useIsNetworkSupported();

  const { register, setValue, errors, isValid, isEditUserSubmitting, handleSubmitEditUser } =
    useEditUserForm(username, setIsModalOpen);

  useEffect(() => {
    setValue('username', username);
    setValue('email', email);
  }, [setValue, username, email]);

  if (!isAuthenticated || !isNetworkSupported) {
    return null;
  }

  return (
    <Modal onClick={() => setIsModalOpen(false)} variant={'close'}>
      <AvatarContainer>
        <AvatarWrapper>
          <Avatar size={200} hasBorder={false} />
        </AvatarWrapper>
        <Button>Change Photo</Button>
      </AvatarContainer>
      <EditUserForm onSubmit={handleSubmitEditUser}>
        <InputsContainer>
          <Input
            label="Username"
            placeholder="username"
            {...register('username')}
            error={errors?.username?.message}
          />
          <Input
            label="Email"
            placeholder="example@email.com"
            {...register('email')}
            error={errors?.email?.message}
          />
        </InputsContainer>
        <Button type="submit" disabled={!isValid} loading={isEditUserSubmitting}>
          Update Account
        </Button>
      </EditUserForm>
    </Modal>
  );
};
