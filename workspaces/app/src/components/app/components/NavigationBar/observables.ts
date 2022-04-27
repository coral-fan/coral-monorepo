import { getDocumentReferenceClientSide } from 'libraries/firebase';
import { getUserUid$, User } from 'libraries/models';
import { docData } from 'rxfire/firestore';
import { filter, map, mergeMap } from 'rxjs/operators';

export const getUserProfile$ = () =>
  getUserUid$().pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) => {
      const documentRef = getDocumentReferenceClientSide('users', uid);
      return docData(documentRef);
    }),
    filter((user): user is User => user !== undefined),
    map(({ username, profilePhoto }) => ({ username, profilePhoto }))
  );
