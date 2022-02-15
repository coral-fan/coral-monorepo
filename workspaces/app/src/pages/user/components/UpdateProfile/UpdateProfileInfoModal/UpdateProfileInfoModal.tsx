import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsAuthenticated } from 'libraries/authentication';
import { Modal, Button, Input, Avatar } from 'components/ui';

import { AvatarContainer, AvatarWrapper, Form, InputsContainer } from './components';

import { useUpdateProfileInfoForm } from './hooks';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { UpdateProfileProps } from '../UpdateProfile';

type UpdateProfileModalInfoProps = UpdateProfileProps & {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const UpdateProfileInfoModal = ({
  username,
  email,
  profilePhoto,
  creditCardInformation,
  setIsModalOpen,
  setUser,
}: UpdateProfileModalInfoProps) => {
  const isAuthenticated = useIsAuthenticated();
  const isNetworkSupported = useIsNetworkSupported();

  const {
    register,
    setValue,
    errors,
    isValid,
    isDirty,
    isUpdateProfileInfoSubmitting,
    handleSubmitUpdateProfileInfo,
  } = useUpdateProfileInfoForm(username, email, setIsModalOpen, setUser);

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
      <Form onSubmit={handleSubmitUpdateProfileInfo}>
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
        <Button
          type="submit"
          disabled={!isDirty || !isValid}
          loading={isUpdateProfileInfoSubmitting}
        >
          Update Account
        </Button>
      </Form>
    </Modal>
  );
};
