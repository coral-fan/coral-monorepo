import { RootState } from 'libraries/state/types';
import { useSelector } from 'react-redux';

export const useIsSigningUp = () =>
  useSelector((state: RootState) => state.authentication.isSigningUp);
