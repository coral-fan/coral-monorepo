import { query, where } from 'firebase/firestore';
import { getCollectionReferenceClientSide, getDocumentExists } from 'libraries/firebase';
import { collectionData } from 'rxfire/firestore';
import { filter, map, mergeMap } from 'rxjs';
import { getUserUid$ } from '../user';
import { ReferralData, UserReferralAccount } from './types';

// TODO: Remove if not used
export const getReferralUserData$ = () =>
  getUserUid$().pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) =>
      collectionData(
        query(
          getCollectionReferenceClientSide<ReferralData>('referrals'),
          where('userId', '==', uid)
        )
      )
    )
  );

export const getIsReferralUser$ = () =>
  getUserUid$().pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) => getDocumentExists<UserReferralAccount>('user-referral-accounts', uid)),
    map((documentExists) => documentExists)
  );
