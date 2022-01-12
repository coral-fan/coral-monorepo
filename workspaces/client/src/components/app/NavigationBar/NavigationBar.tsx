import { useEffect } from 'react';

import styled from '@emotion/styled';
import { DESKTOP_BREAKPOINT } from 'styles/tokens';

import {
  useIsAuthenticated,
  useIsTokenAuthenticated,
  useLogin,
} from 'libraries/authentication/hooks';

import { HamburgerMenuButton, ProfileAvatarButton, LoginButton, LogoHomeLink } from './components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  width: 100%;
  padding: 24px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    padding: 40px 70px;
  }
`;

export const NavigationBar = () => {
  const { loginError } = useLogin();
  const [isAuthenticated] = useIsAuthenticated();
  const [isTokenAuthenticated] = useIsTokenAuthenticated();

  useEffect(() => {
    loginError && console.log(loginError);
  }, [loginError]);

  return (
    <Container>
      <HamburgerMenuButton hasNotifications={false} />
      <LogoHomeLink />
      {isAuthenticated || isTokenAuthenticated ? <ProfileAvatarButton /> : <LoginButton />}
    </Container>
  );
};
