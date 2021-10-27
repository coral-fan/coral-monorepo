import { useContext } from 'react';
import { AuthenticationContext } from '../provider';

export default function useAuthenticationContext() {
  const context = useContext(AuthenticationContext);

  if (context === undefined) {
    throw new Error('useAuthentication hook can only be used with a AuthenticationProvider.');
  }

  return context;
}
