import { useEffect } from 'react';

import styled from '@emotion/styled';
import { DESKTOP_BREAKPOINT } from 'styles/tokens';

import {
  useIsAuthenticated,
  useIsTokenAuthenticated,
  useLogin,
} from 'libraries/authentication/hooks';

import { LogoIcon, BaseLink as Link } from 'components/ui';
import { HamburgerMenuButton, ProfileAvatarButton, LoginButton } from './components';

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

const LogoHomeLink = () => (
  <Link href="/">
    <LogoIcon size={30} />
  </Link>
);

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
