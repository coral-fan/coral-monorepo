import { getDocumentExists, getDocumentData } from 'libraries/firebase';
import { filter, from, map, mergeMap } from 'rxjs';
import { getUserUid$ } from '../user';
import { UserReferralAccount } from './types';

export const getUserReferralAccount$ = (uid: string) =>
  from(getDocumentData<UserReferralAccount>('user-referral-accounts', uid));

export const getIsReferralUser$ = () =>
  getUserUid$().pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) => getDocumentExists<UserReferralAccount>('user-referral-accounts', uid)),
    map((documentExists) => documentExists)
  );
