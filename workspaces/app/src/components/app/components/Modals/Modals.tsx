import { WrongNetworkModal } from './WrongNetworkModal';
import { SignUpModal } from './SignUpModal/SignUpModal';
import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsSigningUp } from 'libraries/authentication';

export const Modals = () => {
  const isNetworkSupported = useIsNetworkSupported();
  const isSigningUp = useIsSigningUp();

  if (!isNetworkSupported) {
    return <WrongNetworkModal />;
  }

  if (isSigningUp) {
    return <SignUpModal />;
  }

  return null;
};
