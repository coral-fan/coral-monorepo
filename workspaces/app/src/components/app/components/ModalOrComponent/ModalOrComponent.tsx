import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsSigningUp } from 'libraries/authentication';
import { WrongNetworkModal } from './WrongNetworkModal';
import { SignUpModal } from './SignUpModal';

interface ModalOrComponentProps {
  component: JSX.Element;
}
export const ModalOrComponent = ({ component }: ModalOrComponentProps) => {
  const isNetworkSupported = useIsNetworkSupported();
  const [isSigningUp] = useIsSigningUp();

  if (!isNetworkSupported) {
    return <WrongNetworkModal />;
  }

  if (isSigningUp) {
    return <SignUpModal />;
  }

  return component;
};
