import { Modal, Button } from 'components/ui';
import { useIsSigningUp } from 'libraries/authentication/hooks';

export const SignUpModal = () => {
  const [isSigningUp] = useIsSigningUp();

  if (!isSigningUp) {
    return null;
  }

  return (
    <Modal>
      <Button>Complete Sign Up</Button>
    </Modal>
  );
};
