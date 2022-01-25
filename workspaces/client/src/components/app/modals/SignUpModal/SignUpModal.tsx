import { boolean, object, string, InferType } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useIsSigningUp } from 'libraries/authentication';
import { useIsNetworkSupported } from 'libraries/blockchain';

import { Modal, Button, Toggle } from 'components/ui';
import { Input } from 'components/ui/Input';

import {
  SignUpForm,
  InputsContainer,
  LegalAgreementContainer,
  LegalAgreementCopy,
} from './components';
import { useUserUid } from './hooks';
import { useMemo, useState } from 'react';
import { completeSignUp } from './utils';

const signUpSchema = object({
  username: string().required().min(3),
  email: string()
    .email()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  doesAgree: boolean().required().default(false).isTrue(),
});

type SignUpSchema = InferType<typeof signUpSchema>;

export const SignUpModal = () => {
  const isSigningUp = useIsSigningUp();
  const isNetworkSupported = useIsNetworkSupported();
  const [isCompletingSignUp, setIsCompleteingSignUp] = useState(false);

  const uid = useUserUid();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpSchema>({
    resolver: yupResolver(signUpSchema),
    mode: 'all',
  });

  const handleSignUpCompletion = useMemo(
    () =>
      handleSubmit(async ({ username, email }) => {
        setIsCompleteingSignUp(true);
        await completeSignUp(username, email, uid);
        setIsCompleteingSignUp(false);
      }),
    [handleSubmit, uid]
  );

  if (!isSigningUp || !isNetworkSupported) {
    return null;
  }

  return (
    <Modal title="Sign up">
      <SignUpForm onSubmit={handleSignUpCompletion}>
        <InputsContainer>
          <Input
            label="Pick a username"
            placeholder="username"
            {...register('username')}
            error={errors?.username?.message}
          />
          <Input
            label="Email address"
            placeholder="example@email.com"
            {...register('email')}
            error={errors?.email?.message}
          />
        </InputsContainer>
        <LegalAgreementContainer>
          <Toggle {...register('doesAgree')} />
          <LegalAgreementCopy>
            <div>
              I agree to Coral&apos;s <u>privacy policy</u>
            </div>
            <div>
              and <u>terms &amp; conditions</u>
            </div>
          </LegalAgreementCopy>
        </LegalAgreementContainer>
        <Button
          type="submit"
          disabled={!isValid || isCompletingSignUp}
          loading={isCompletingSignUp}
        >
          Create Account
        </Button>
      </SignUpForm>
    </Modal>
  );
};
