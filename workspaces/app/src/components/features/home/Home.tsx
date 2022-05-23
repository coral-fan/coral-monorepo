import { useIsAuthenticated } from 'libraries/authentication';

export const Home = () => {
  const isAuthenticated = useIsAuthenticated();
  return <div>You are {`${isAuthenticated ? 'authenticated' : 'not authenticated'}.`}</div>;
};
