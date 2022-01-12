import { useEffect } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';

import { Avatar, Button, LogoIcon } from 'components/ui';
import {
  useIsAuthenticated,
  useIsTokenAuthenticated,
  useLogin,
  useLogout,
} from 'libraries/authentication/hooks';
import { HamburgerMenuButton } from './components/HamburgerMenuButton/HamburgerMenuButton';
import { BaseLink as Link } from 'components/ui/BaseLink';
import { buttonBaseStyle } from 'components/ui/buttons/styles';

const loginButtonStyle = css`
  height: 30px;
  width: 95px;
  background-image: ${tokens.gradient.primary};
  justify-self: end;
`;

const LoginButton = () => {
  const { login, isLoggingIn } = useLogin();
  return (
    <Button css={loginButtonStyle} onClick={login} disabled={isLoggingIn} loading={isLoggingIn}>
      Login
    </Button>
  );
};

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

const profileAvatarButtonStyle = css`
  ${buttonBaseStyle};
  background-color: transparent;
  margin-left: auto;
`;

const ProfileAvatarButton = () => {
  const logout = useLogout();
  return (
    <button css={profileAvatarButtonStyle} onClick={logout}>
      <Avatar hasBorder={true} size={30} />
    </button>
  );
};

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
