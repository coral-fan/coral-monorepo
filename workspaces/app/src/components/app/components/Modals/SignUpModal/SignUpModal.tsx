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

import { useSignUpForm } from './hook';

export const SignUpModal = () => {
  const [isSigningUp] = useIsSigningUp();
  const isNetworkSupported = useIsNetworkSupported();

  const { register, errors, isValid, isSignUpSubmitting, handleSubmitSignUp } = useSignUpForm();

  if (!isSigningUp || !isNetworkSupported) {
    return null;
  }

  return (
    <Modal title="Sign up">
      <SignUpForm onSubmit={handleSubmitSignUp}>
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
              I agree to Coral&apos;s <u>privacy policy</u> and <u> terms &amp; conditions</u>
            </div>
          </LegalAgreementCopy>
        </LegalAgreementContainer>
        <Button
          type="submit"
          disabled={!isValid || isSignUpSubmitting}
          loading={isSignUpSubmitting}
        >
          Create Account
        </Button>
      </SignUpForm>
    </Modal>
  );
};
