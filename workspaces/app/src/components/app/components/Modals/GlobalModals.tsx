import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsSigningUp } from 'libraries/authentication';
import { WrongNetworkModal } from './WrongNetworkModal';
import { SignUpModal } from './SignUpModal';

export const GlobalModals = () => {
  const isNetworkSupported = useIsNetworkSupported();
  const [isSigningUp] = useIsSigningUp();

  if (!isNetworkSupported) {
    return <WrongNetworkModal />;
  }

  if (isSigningUp) {
    return <SignUpModal />;
  }

  return null;
};
