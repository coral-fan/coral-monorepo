import { Modal, Button } from 'components/ui';

export const SignUpModal = () => {
  const isSigningUp = false;

  if (!isSigningUp) {
    return null;
  }

  return (
    <Modal>
      <Button>Complete Sign Up</Button>
    </Modal>
  );
};
