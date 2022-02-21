import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { useIsSigningUp, useLogin } from 'libraries/authentication';
import { Button } from 'components/ui';

const loginButtonStyle = css`
  height: 30px;
  width: 95px;
  color: ${tokens.font.color.contrast};
  background-color: ${tokens.background.color.brand};
  justify-self: end;
`;
export const LoginButton = () => {
  const { login, isLoggingIn } = useLogin();
  const [isSigningUp] = useIsSigningUp();

  const isPending = isLoggingIn || isSigningUp;

  return (
    <Button css={loginButtonStyle} onClick={login} disabled={isPending} loading={isPending}>
      Login
    </Button>
  );
};
