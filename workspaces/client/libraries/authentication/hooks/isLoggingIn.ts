import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'libraries/state/types';
import { setIsLoggingIn } from '../slice';

export const useIsLoggingIn = (): [boolean, (isLoggingIn: boolean) => void] => {
  const dispatch = useDispatch();
  return [
    useSelector((state: RootState) => state.authentication.isLoggingIn),
    (isLoggingIn: boolean) => dispatch(setIsLoggingIn(isLoggingIn)),
  ];
};
