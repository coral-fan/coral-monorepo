import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsAuthenticated } from 'libraries/authentication';
import { Modal, Button, Input, TextArea } from 'components/ui';

import { Form, InputsContainer } from './components';

import { useUpdateProfileInfoForm } from './hooks';
import { useIsUpdateProfileInfoModalOpen } from 'components/features/user/hooks';

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
    <Modal title={'Update Profile'} onClick={() => setIsModalOpen(false)} variant={'close'}>
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
          <TextArea
            label="Bio"
            placeholder="bio"
            {...register('bio')}
            error={errors?.bio?.message}
          />
          <Input
            label="Instagram"
            placeholder="Instagram username"
            {...register('socialHandles.instagram')}
            error={errors?.socialHandles?.instagram?.message}
          />
          <Input
            label="Twitter"
            placeholder="Twitter username"
            {...register('socialHandles.twitter')}
            error={errors?.socialHandles?.twitter?.message}
          />
          <Input
            label="Soundcloud"
            placeholder="Soundcloud username"
            {...register('socialHandles.soundcloud')}
            error={errors?.socialHandles?.soundcloud?.message}
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
