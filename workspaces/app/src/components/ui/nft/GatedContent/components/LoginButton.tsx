import { useSignInModalState } from 'components/app';
import { Button } from 'components/ui';
import { useLogin } from 'libraries/authentication';

export const LoginButton = () => {
  const { isLoggingIn } = useLogin();
  const { openModal } = useSignInModalState();

  return (
    <Button onClick={openModal} loading={isLoggingIn} disabled={isLoggingIn}>
      Login
    </Button>
  );
};
