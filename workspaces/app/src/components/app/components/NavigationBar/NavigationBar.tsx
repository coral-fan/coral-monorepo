import styled from '@emotion/styled';
import { DESKTOP_BREAKPOINT } from 'styles/tokens';

import { HamburgerMenuButton, Menu, LogoHomeLink } from './components';
import { useEffect, useState } from 'react';
import { User } from 'libraries/models';
import { getDocumentData } from 'libraries/firebase';
import { getLoggedIn$ } from 'libraries/authentication';

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

export type NavigationBarUserData = Pick<User, 'username' | 'profilePhoto'>;

export const NavigationBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userUid, setUserUid] = useState<string | null>(null);
  const [userData, setUserData] = useState<NavigationBarUserData | undefined>();

  useEffect(() => {
    let isMounted = true;
    getLoggedIn$().subscribe((user) => {
      if (user) {
        if (isMounted) setUserUid(user.uid);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const userData = userUid
        ? await getDocumentData<NavigationBarUserData>('users', userUid)
        : undefined;
      if (isMounted) setUserData(userData);
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [userUid]);

  return (
    <Container>
      <LogoHomeLink />
      <HamburgerMenuButton hasNotifications={false} onClick={() => setShowMenu(true)} />
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} userData={userData} />
    </Container>
  );
};
