import {
  getCollectionReferenceClientSide,
  getDocumentExists,
  getDocumentReferenceClientSide,
} from 'libraries/firebase';
import { collectionChanges, docData } from 'rxfire/firestore';
import { filter, map, mergeMap, skip } from 'rxjs';
import { getUserUid$ } from '../user';
import { RedemptionData, UserPointsAccount } from './types';

export const getUserPointsAccount$ = (uid: string) => {
  const userReferralAccountDocRef = getDocumentReferenceClientSide<UserPointsAccount>(
    'user-points-accounts',
    uid
  );
  return docData(userReferralAccountDocRef);
};

export const getIsReferralUser$ = () =>
  getUserUid$().pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) => getDocumentExists<UserPointsAccount>('user-points-accounts', uid)),
    map((documentExists) => documentExists)
  );

export const getUserReferralRedemptionDocumentAdded$ = (uid: string) => {
  const userPointsRedeemedTransactionsRef = getCollectionReferenceClientSide<RedemptionData>(
    `user-points-accounts/${uid}/pointsRedeemedTransactions`
  );

  return collectionChanges(userPointsRedeemedTransactionsRef, { events: ['added'] }).pipe(skip(1));
};
