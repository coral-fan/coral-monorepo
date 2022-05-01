import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { useIsSigningUp, useLogin } from 'libraries/authentication';
import { Button } from 'components/ui';
import { useSignInModalState } from '../../SignInModal';

const loginButtonStyle = css`
  width: 95px;
  color: ${tokens.font.color.contrast};
  background-color: ${tokens.background.color.brand};
  justify-self: end;
`;
export const LoginButton = () => {
  const { isLoggingIn } = useLogin();
  const [isSigningUp] = useIsSigningUp();

  const isPending = isLoggingIn || isSigningUp;

  const { openModal } = useSignInModalState();

  return (
    <Button css={loginButtonStyle} onClick={openModal} disabled={isPending} loading={isPending}>
      Login
    </Button>
  );
};
