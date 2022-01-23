import styled from '@emotion/styled';
import { Modal, Button, Toggle } from 'components/ui';
import { Input } from 'components/ui/Input';

import { useIsSigningUp } from 'libraries/authentication';
import { useIsNetworkSupported } from 'libraries/blockchain';
import { useForm } from 'react-hook-form';
import { boolean, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  align-items: center;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;

const LegalAgreementContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: fit-content;
  padding-bottom: 24px;
`;

const LegalAgreementCopy = styled.div`
  font-size: 14px;
`;

const signUpSchema = object({
  username: string().required().min(3),
  email: string()
    .email()
    .optional()
    .transform((value) => (value === '' ? undefined : value)),
  doesAgree: boolean().required().default(false).isTrue(),
});

export const SignUpModal = () => {
  const [isSigningUp, setIsSigningUp] = useIsSigningUp();
  const isNetworkSupported = useIsNetworkSupported();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'all',
  });

  const completeSignUp = handleSubmit((data) => {
    console.log(data);
    setIsSigningUp(false);
  });

  if (!isSigningUp || !isNetworkSupported) {
    return null;
  }

  return (
    <Modal title="Sign up">
      <SignUpForm onSubmit={completeSignUp}>
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
        <Button type="submit" disabled={!isValid}>
          Create Account
        </Button>
      </SignUpForm>
    </Modal>
  );
};
