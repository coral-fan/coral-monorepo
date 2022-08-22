import { getDocumentExists, getDocumentData } from 'libraries/firebase';
import { filter, map, mergeMap } from 'rxjs';
import { getUserUid$ } from '../user';
import { UserReferralAccount } from './types';

export const getUserReferralAccount$ = () =>
  getUserUid$().pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) => getDocumentData<UserReferralAccount>('user-referral-accounts', uid)),
    filter((user) => user !== undefined),
    map((user) => user)
  );

export const getIsReferralUser$ = () =>
  getUserUid$().pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) => getDocumentExists<UserReferralAccount>('user-referral-accounts', uid)),
    map((documentExists) => documentExists)
  );
