import { RootState } from 'libraries/state/types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateIsSigningUp } from '../slice';

export const useIsSigningUp = (): [boolean, (isSigningUp: boolean) => void] => {
  const dispatch = useDispatch();
  const isSigningUp = useSelector((state: RootState) => state.authentication.isSigningUp);
  const setIsSigningUp = useCallback(
    (isSigningUp: boolean) => dispatch(updateIsSigningUp(isSigningUp)),
    [dispatch]
  );
  return [isSigningUp, setIsSigningUp];
};
