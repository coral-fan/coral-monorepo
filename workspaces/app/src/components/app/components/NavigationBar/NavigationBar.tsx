import styled from '@emotion/styled';

import { HamburgerMenuButton, Menu, LogoHomeLink } from './components';
import { useState } from 'react';
import { getUserUid$, User } from 'libraries/models';
import { getDocumentData } from 'libraries/firebase';
import { filter, map, mergeMap } from 'rxjs/operators';
import { useObservable } from 'libraries/utils';

import { DESKTOP_BREAKPOINT } from 'styles/tokens';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  width: 100%;
  padding: 24px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    padding: 40px 70px;
  }
`;

export type UserProfile = Pick<User, 'username' | 'profilePhoto'>;

export const NavigationBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const getUserProfileData$ = () => {
    return getUserUid$().pipe(
      filter((uid): uid is string => uid !== undefined),
      mergeMap((uid) => getDocumentData<User>('users', uid)),
      filter((user): user is User => user !== undefined),
      map(({ username, profilePhoto }) => ({ username, profilePhoto }))
    );
  };

  const userProfileData = useObservable(getUserProfileData$, undefined);

  return (
    <Container>
      <LogoHomeLink />
      <HamburgerMenuButton hasNotifications={false} onClick={() => setShowMenu(true)} />
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} userProfileData={userProfileData} />
    </Container>
  );
};
