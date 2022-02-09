import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsAuthenticated } from 'libraries/authentication';
import { Modal, Button, Input, Avatar } from 'components/ui';

import { AvatarContainer, AvatarWrapper, EditUserForm, InputsContainer } from './components';

import { useEditUserForm } from './hooks';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { EditUserProps } from './types';

interface EditUserModalProps extends EditUserProps {
  showModal: Dispatch<SetStateAction<boolean>>;
}

export const EditUserModal = ({ username, email, profilePhoto, showModal }: EditUserModalProps) => {
  const isAuthenticated = useIsAuthenticated();
  const isNetworkSupported = useIsNetworkSupported();

  const { register, setValue, errors, isValid, isEditUserSubmitting, handleSubmitEditUser } =
    useEditUserForm(showModal);

  useEffect(() => {
    setValue('username', username);
    setValue('email', email);
  }, []);

  if (!isAuthenticated || !isNetworkSupported) {
    return null;
  }

  return (
    <Modal onClick={() => showModal(false)} variant={'close'}>
      <EditUserForm onSubmit={handleSubmitEditUser}>
        <AvatarContainer>
          <AvatarWrapper>
            <Avatar size={200} hasBorder={false} />
          </AvatarWrapper>
          <Button>Change Photo</Button>
        </AvatarContainer>
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
