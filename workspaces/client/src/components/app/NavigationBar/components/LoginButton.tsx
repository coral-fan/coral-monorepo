import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { useLogin } from 'libraries/authentication/hooks';
import { Button } from 'components/ui';

const loginButtonStyle = css`
  height: 30px;
  width: 95px;
  background-image: ${tokens.gradient.primary};
  justify-self: end;
`;
export const LoginButton = () => {
  const { login, isLoggingIn } = useLogin();
  return (
    <Button css={loginButtonStyle} onClick={login} disabled={isLoggingIn} loading={isLoggingIn}>
      Login
    </Button>
  );
};
