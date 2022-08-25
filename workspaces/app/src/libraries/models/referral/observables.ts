import { getDocumentExists, getDocumentReferenceClientSide } from 'libraries/firebase';
import { docData } from 'rxfire/firestore';
import { filter, map, mergeMap } from 'rxjs';
import { getUserUid$ } from '../user';
import { UserReferralAccount } from './types';

export const getUserReferralAccount$ = (uid: string) => {
  const userReferralAccountDocRef = getDocumentReferenceClientSide<UserReferralAccount>(
    'user-referral-accounts',
    uid
  );
  return docData(userReferralAccountDocRef);
};

export const getIsReferralUser$ = () =>
  getUserUid$().pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) => getDocumentExists<UserReferralAccount>('user-referral-accounts', uid)),
    map((documentExists) => documentExists)
  );
