import styled from '@emotion/styled';
import { Modal, Button } from 'components/ui';
import { Input } from 'components/ui/Input';
import { useIsSigningUp } from 'libraries/authentication/hooks';
import { useSignUpCompletedSubject } from 'libraries/authentication/hooks/signUpCompleteSubject';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-top: 24px;
`;

export const SignUpModal = () => {
  const [isSigningUp] = useIsSigningUp();
  const signUpCompletedSubject = useSignUpCompletedSubject();

  if (!isSigningUp) {
    return null;
  }

  const completeSignUp = () => signUpCompletedSubject.next();

  return (
    <Modal title="Sign up">
      <Content>
        <Input label="Pick a display name" placeholder="Enter a name" />
        <Input label="Pick a username" placeholder="username" />
        <Button onClick={completeSignUp} disabled={true}>
          Create Account
        </Button>
      </Content>
    </Modal>
  );
};
