import { useObservable } from 'libraries/utils';
import { getIsReferralUser$, getUserReferralAccount$ } from './observables';

export const useIsReferralUser = () => useObservable(getIsReferralUser$, false);

export const useReferralUserData = () => useObservable(getUserReferralAccount$, null);
