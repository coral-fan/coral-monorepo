import { Button } from 'components/ui';
import { useLogin } from 'libraries/authentication';

export const LoginButton = () => {
  const { login } = useLogin();
  return <Button onClick={login}>Login</Button>;
};
