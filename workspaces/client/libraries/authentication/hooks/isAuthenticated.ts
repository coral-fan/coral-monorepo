import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'libraries/state/types';
import { setIsAuthenticated } from '../slice';

export const useIsAuthenticated = (): [boolean, (isAuthenticated: boolean) => void] => {
  const dispatch = useDispatch();
  return [
    useSelector((state: RootState) => state.authentication.isAuthenticated),
    (isAuthenticated: boolean) => void dispatch(setIsAuthenticated(isAuthenticated)),
  ];
};
