import { useObservable } from 'libraries/utils';
import { getIsReferralUser$ } from './observables';

export const useIsReferralUser = () => useObservable(getIsReferralUser$, false);
