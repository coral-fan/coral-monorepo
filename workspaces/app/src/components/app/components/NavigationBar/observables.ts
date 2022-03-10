import { getDocumentData } from 'libraries/firebase';
import { getUserUid$, User } from 'libraries/models';
import { filter, map, mergeMap } from 'rxjs/operators';

export const getUserProfile$ = () =>
  getUserUid$().pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) => getDocumentData<User>('users', uid)),
    filter((user): user is User => user !== undefined),
    map(({ username, profilePhoto }) => ({ username, profilePhoto }))
  );
