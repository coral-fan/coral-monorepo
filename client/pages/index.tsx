import { useRouter } from 'next/router';
import React from 'react';
import useWeb3 from 'utils/hooks/web3';

export default function Home() {
  const { deactivate } = useWeb3();
  const router = useRouter();

  const handleClick = () => {
    deactivate();
    router.push('/login');
  };

  return (
    <>
      <div>You authenticated.</div>
      <button onClick={handleClick}>Logout</button>
    </>
  );
}
