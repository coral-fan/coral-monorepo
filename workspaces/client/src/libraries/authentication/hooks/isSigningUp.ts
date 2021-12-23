import { RootState } from 'libraries/state/types';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSigningUp } from '../slice';

export const useIsSigningUp = (): [boolean, (isSigningUp: boolean) => void] => {
  const dispatch = useDispatch();
  return [
    useSelector((state: RootState) => state.authentication.isSigningUp),
    (isSigningUp: boolean) => dispatch(setIsSigningUp(isSigningUp)),
  ];
};
