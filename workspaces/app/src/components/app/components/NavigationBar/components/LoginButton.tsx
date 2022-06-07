import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { useIsSigningUp, useLogin } from 'libraries/authentication';
import { Button } from 'components/ui';
import { useOpenSignInModal } from '../../SignInModal';

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

  const handleOpenSignInModal = useOpenSignInModal();

  return (
    <Button
      css={loginButtonStyle}
      onClick={handleOpenSignInModal}
      disabled={isPending}
      loading={isPending}
    >
      Login
    </Button>
  );
};
