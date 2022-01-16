import { RootState } from 'libraries/state/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateIsTokenAuthenticated } from '../slice';

export const useIsTokenAuthenticated = (): [boolean, (isTokenAuthenticated: boolean) => void] => {
  const dispatch = useDispatch();
  return [
    useSelector((state: RootState) => state.authentication.isTokenAuthenticated),
    (isTokenAuthenticated: boolean) => dispatch(updateIsTokenAuthenticated(isTokenAuthenticated)),
  ];
};
