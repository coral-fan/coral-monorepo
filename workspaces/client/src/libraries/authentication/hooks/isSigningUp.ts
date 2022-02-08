import { RootState } from 'libraries/state/types';
import { getCoralAPIAxios } from 'libraries/utils/api';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateIsSigningUp } from '../slice';

const axios = getCoralAPIAxios();

export const useIsSigningUp = (): [boolean, (isSigningUp: boolean) => Promise<void>] => {
  const dispatch = useDispatch();
  const isSigningUp = useSelector((state: RootState) => state.authentication.isSigningUp);
  const setIsSigningUp = useCallback(
    async (isSigningUp: boolean) => {
      await axios.post('is-signing-up', { isSigningUp: false });
      dispatch(updateIsSigningUp(isSigningUp));
    },
    [dispatch]
  );
  return [isSigningUp, setIsSigningUp];
};
