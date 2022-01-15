import { useIsAuthenticated } from 'libraries/authentication/hooks';

export default function Home() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <>
      <div>You are {`${isAuthenticated ? 'authenticated' : 'not authenticated'}.`}</div>
    </>
  );
}
