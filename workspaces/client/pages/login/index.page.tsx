import { useLogin } from 'utils/hooks/authentication';

export default function login() {
  const { login, isLoggingIn, loginError } = useLogin();

  if (loginError) {
    console.log(loginError);
  }

  return (
    <>
      <button onClick={login}>{isLoggingIn ? 'Logging In...' : 'Login'}</button>
    </>
  );
}
