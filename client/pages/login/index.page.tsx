import { useLogin } from 'utils/hooks/authentication';

export default function login() {
  const handleClick = useLogin();

  return (
    <>
      <button onClick={handleClick}>Login</button>
    </>
  );
}
