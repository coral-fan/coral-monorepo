import { useOpenSignInModal } from 'components/app';
import { Button } from 'components/ui';
import { useLogin } from 'libraries/authentication';

export const LoginButton = () => {
  const { isLoggingIn } = useLogin();
  const handleOpenSignInModal = useOpenSignInModal();

  return (
    <Button onClick={handleOpenSignInModal} loading={isLoggingIn} disabled={isLoggingIn}>
      Login
    </Button>
  );
};
