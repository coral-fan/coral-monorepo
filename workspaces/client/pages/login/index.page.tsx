import { Button } from 'components/ui';
import { useLogin } from 'library/hooks/authentication';

export default function Login() {
  const { login, isLoggingIn, loginError } = useLogin();

  if (loginError) {
    console.log(loginError);
  }

  return (
    <>
      <Button onClick={login}>{isLoggingIn ? 'Logging In...' : 'Login'}</Button>
    </>
  );
}
