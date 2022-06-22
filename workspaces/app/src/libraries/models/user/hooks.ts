import { getAuth } from 'firebase/auth';
import { getCoralAPIAxios } from 'libraries/utils';
import { useObservable } from 'libraries/utils/hooks';
import { useMemo } from 'react';
import { getStripeCustomerId$, IncomingUserData } from '.';
import { getShippingInfoId$, getUsernames$, getUserUid$ } from './observables';

const getUserUid = () => getAuth().currentUser?.uid;

export const useUserUid = () => useObservable(getUserUid$, getUserUid());

export const useUsernames = () => {
  const initialUsernames = useMemo(() => new Set<string>(), []);
  return useObservable(getUsernames$, initialUsernames);
};

const axios = getCoralAPIAxios();

const upsertUser = (uid: string, incomingUserData: IncomingUserData) =>
  axios.post('user', {
    uid,
    incomingUserData,
  });

export const useUpsertUser = () => upsertUser;

export const useStripeCustomerId = () => useObservable(getStripeCustomerId$, null);

export const useShippingInfoId = () => useObservable(getShippingInfoId$, null);
