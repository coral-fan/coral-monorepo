import { useIsNetworkSupported } from 'libraries/blockchain';
import { useIsSigningUp } from 'libraries/authentication';
import { WrongNetworkModal } from './WrongNetworkModal';
import { SignUpModal } from './SignUpModal';
import { SignInModal } from '../SignInModal';
import { useRouter } from 'next/router';
import { SITE_LINKS } from 'consts';
interface ModalOrComponentProps {
  component: JSX.Element;
}
export const ModalOrComponent = ({ component }: ModalOrComponentProps) => {
  const isNetworkSupported = useIsNetworkSupported();
  const [isSigningUp] = useIsSigningUp();

  const { asPath } = useRouter();

  // TODO: revisit to see if there's a better way to do this
  if (asPath.includes(SITE_LINKS.PRIVACY_POLICY) || asPath === SITE_LINKS.TERMS_OF_USE) {
    return component;
  }

  if (!isNetworkSupported) {
    return <WrongNetworkModal />;
  }

  if (isSigningUp) {
    return <SignUpModal />;
  }

  return (
    <>
      {component}
      <SignInModal />
    </>
  );
};
