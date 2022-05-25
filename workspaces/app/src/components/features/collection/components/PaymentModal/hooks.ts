import { getDocumentReferenceClientSide } from 'libraries/firebase';
import { getUserUid$, PublicUserData } from 'libraries/models';
import { useObservable } from 'libraries/utils';
import { docData } from 'rxfire/firestore';
import { combineLatest, filter, map, mergeMap } from 'rxjs';

const getCurrentUser$ = () => {
  const userUid$ = getUserUid$();
  const publicUserData$ = userUid$.pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) => {
      const userDocRef = getDocumentReferenceClientSide<PublicUserData>('users', uid);
      return docData(userDocRef);
    })
  );

  return combineLatest([userUid$, publicUserData$]).pipe(
    filter(
      (user): user is [string, PublicUserData] =>
        typeof user[0] === 'string' && user[1] !== undefined
    ),
    map(([id, publicUserData]) => ({ id, ...publicUserData }))
  );
};

export const useCurrentUser = () => useObservable(getCurrentUser$, undefined);
