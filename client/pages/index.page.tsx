import { useLogout } from 'utils/hooks/authentication';

export default function Home() {
  return (
    <>
      <div>You authenticated.</div>
      <button onClick={useLogout()}>Logout</button>
    </>
  );
}
