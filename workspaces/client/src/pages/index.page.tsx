import { useIsAuthenticated } from 'libraries/authentication';

export default function Home() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <>
      <div>You are {`${isAuthenticated ? 'authenticated' : 'not authenticated'}.`}</div>
    </>
  );
}
