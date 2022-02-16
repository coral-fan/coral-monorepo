import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsAuthenticated } from 'libraries/authentication';
import { Modal, Button, Input, Avatar } from 'components/ui';

import { AvatarContainer, AvatarWrapper, Form, InputsContainer } from './components';

import { useUpdateProfileInfoForm } from './hooks';
import { useEffect } from 'react';
import { useIsUpdateProfileInfoModalOpen, useUser } from 'pages/user/hooks';

export const UpdateProfileInfoModal = () => {
  const isAuthenticated = useIsAuthenticated();
  const isNetworkSupported = useIsNetworkSupported();
  const [, setIsModalOpen] = useIsUpdateProfileInfoModalOpen();

  const {
    register,
    errors,
    isValid,
    isDirty,
    isUpdateProfileInfoSubmitting,
    handleSubmitUpdateProfileInfo,
  } = useUpdateProfileInfoForm();

  if (!isAuthenticated || !isNetworkSupported) {
    return null;
  }

  return (
    <Modal onClick={() => setIsModalOpen(false)} variant={'close'}>
      <AvatarContainer>
        <AvatarWrapper>
          <Avatar size={200} hasBorder={false} />
        </AvatarWrapper>
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
