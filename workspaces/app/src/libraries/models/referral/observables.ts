import {
  getCollectionReferenceClientSide,
  getDocumentExists,
  getDocumentReferenceClientSide,
} from 'libraries/firebase';
import { collectionChanges, docData } from 'rxfire/firestore';
import { filter, map, mergeMap, skip } from 'rxjs';
import { getUserUid$ } from '../user';
import { RedemptionData, UserReferralAccount } from './types';

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

export const getUserReferralRedemptionDocumentAdded$ = (uid: string) => {
  const userPointsRedeemedTransactionsRef = getCollectionReferenceClientSide<RedemptionData>(
    `user-referral-accounts/${uid}/pointsRedeemedTransactions`
  );

  return collectionChanges(userPointsRedeemedTransactionsRef, { events: ['added'] }).pipe(skip(1));
};
