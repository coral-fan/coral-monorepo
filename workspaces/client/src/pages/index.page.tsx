import { useIsTokenAuthenticated } from 'libraries/authentication/hooks';

export default function Home() {
  const [isTokenAuthenticated] = useIsTokenAuthenticated();

  return (
    <>
      <div>You are {`${isTokenAuthenticated ? 'authenticated' : 'not authenticated'}.`}</div>
    </>
  );
}
