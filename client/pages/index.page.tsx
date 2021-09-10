import { useRouter } from 'next/router';
import useWeb3 from 'utils/hooks/web3';
import { LOGIN_ROUTE } from 'utils/consts/routes';

export default function Home() {
  const { deactivate } = useWeb3();
  const router = useRouter();

  const handleClick = () => {
    deactivate();
    router.push(LOGIN_ROUTE);
  };

  return (
    <>
      <div>You authenticated.</div>
      <button onClick={handleClick}>Logout</button>
    </>
  );
}
