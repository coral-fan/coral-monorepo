import styled from '@emotion/styled';

import { HamburgerMenuButton, Menu, LogoHomeLink } from './components';
import { useState } from 'react';
import { User } from 'libraries/models';
import { useObservable } from 'libraries/utils';
import { getUserProfileData$ } from './observables';
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

  const userProfileData = useObservable(getUserProfileData$, undefined);

  return (
    <Container>
      <LogoHomeLink />
      <HamburgerMenuButton hasNotifications={false} onClick={() => setShowMenu(true)} />
      <Menu showMenu={showMenu} setShowMenu={setShowMenu} userProfileData={userProfileData} />
    </Container>
  );
};
