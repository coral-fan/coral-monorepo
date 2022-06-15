import styled from '@emotion/styled';
import { Modal, Button, Toggle, Input, Link as BaseLink } from 'components/ui';
import { SITE_LINKS } from 'consts';
import { TogglesContainer, InputsContainer, SignUpForm } from './components';
import { useSignUpForm } from './hook';

const Link = styled(BaseLink)`
  text-decoration: underline;
`;

export const SignUpModal = () => {
  const { register, errors, isValid, isSignUpSubmitting, handleSubmitSignUp, getValues } =
    useSignUpForm();

  const { email } = getValues();

  return (
    <Modal title="Sign up">
      <SignUpForm onSubmit={handleSubmitSignUp}>
        <InputsContainer>
          <Input
            label="Pick a username"
            placeholder="username"
            autoComplete="off"
            {...register('username')}
            error={errors?.username?.message}
          />
          <Input
            label="Email Address (Optional)"
            placeholder="example@email.com"
            autoComplete="off"
            {...register('email')}
            error={errors?.email?.message}
          />
        </InputsContainer>
        <TogglesContainer>
          {email && email !== undefined && (
            <Toggle {...register('doesOptIntoMarketing')}>Opt into marketing</Toggle>
          )}
          <Toggle {...register('doesAgree')}>
            {"I agree to Coral's "}
            <Link href={SITE_LINKS.PRIVACY_POLICY} openInNewTab>
              {'privacy policy '}
            </Link>
            {'and '}
            <Link href={SITE_LINKS.TERMS_OF_SERVICE} openInNewTab>
              terms of service
            </Link>
          </Toggle>
        </TogglesContainer>
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
