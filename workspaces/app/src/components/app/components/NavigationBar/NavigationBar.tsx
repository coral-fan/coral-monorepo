import styled from '@emotion/styled';
import { DESKTOP_BREAKPOINT } from 'styles/tokens';

import { useIsAuthenticated, useLogout } from 'libraries/authentication';

import { HamburgerMenuButton, LoginButton, LogoHomeLink } from './components';

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

export const NavigationBar = () => {
  const isAuthenticated = useIsAuthenticated();
  const logout = useLogout();

  return (
    <Container>
      <LogoHomeLink />
      {isAuthenticated ? (
        <HamburgerMenuButton hasNotifications={false} onClick={logout} />
      ) : (
        <LoginButton />
      )}
    </Container>
  );
};
