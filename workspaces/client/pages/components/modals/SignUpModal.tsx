import { Modal, Button } from 'components/ui';
import { useIsSigningUp } from 'libraries/authentication/hooks';
import { useSignUpCompletedSubject } from 'libraries/authentication/hooks/signUpCompleteSubject';

export const SignUpModal = () => {
  const [isSigningUp] = useIsSigningUp();
  const signUpCompletedSubject = useSignUpCompletedSubject();

  if (!isSigningUp) {
    return null;
  }

  const completeSignUp = () => signUpCompletedSubject.next();

  return (
    <Modal>
      <Button onClick={completeSignUp}>Complete Sign Up</Button>
    </Modal>
  );
};
