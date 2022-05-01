import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'libraries/state/types';
import { updateIsLoggingIn } from '../slice';
import { useCallback } from 'react';

// TODO: refactor to use zustand
export const useIsLoggingIn = (): [boolean, (isLoggingIn: boolean) => void] => {
  const dispatch = useDispatch();
  const isLoggingIn = useSelector((state: RootState) => state.authentication.isLoggingIn);
  const setIsLoggingIn = useCallback(
    (isLoggingIn: boolean) => dispatch(updateIsLoggingIn(isLoggingIn)),
    [dispatch]
  );

  return [isLoggingIn, setIsLoggingIn];
};
