import { useIsSigningUp, useIsTokenAuthenticated } from 'libraries/authentication/hooks';

export default function Home() {
  const [isTokenAuthenticated] = useIsTokenAuthenticated();
  const [isSigningUp] = useIsSigningUp();

  return (
    <>
      <div>
        You are {`${isTokenAuthenticated && !isSigningUp ? 'authenticated' : 'not authenticated'}.`}
      </div>
    </>
  );
}
