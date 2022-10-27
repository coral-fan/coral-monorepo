import { useCallback, useMemo } from 'react';
import create from 'zustand';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Modal } from 'components/ui';
import { useLogin } from 'libraries/authentication';
import { useIsMetaMaskInjected, useWallet } from 'libraries/blockchain';

interface SignInModalOptions {
  isSignUp: boolean;
}

interface SignInModalState {
  isModalOpen: boolean;
  isSignUp: boolean;
  openModal: (options?: SignInModalOptions) => void;
  closeModal: () => void;
}

const useSignInModalState = create<SignInModalState>((set) => ({
  isModalOpen: false,
  isSignUp: false,
  openModal: ({ isSignUp } = { isSignUp: false }) => set(() => ({ isModalOpen: true, isSignUp })),
  closeModal: () => set(() => ({ isModalOpen: false })),
}));

const useLoginWithWeb3Auth = () => {
  const { setConnectorType } = useWallet();
  const { closeModal } = useSignInModalState();

  const { login } = useLogin();

  const loginWithWeb3Auth = useCallback(async () => {
    setConnectorType('WEB3AUTH');
    closeModal();
    await login('WEB3AUTH');
  }, [setConnectorType, closeModal, login]);

  return loginWithWeb3Auth;
};

export const useOpenSignInModal = (options?: SignInModalOptions) => {
  const { openModal } = useSignInModalState();
  const isMetaMaskInjected = useIsMetaMaskInjected();
  const loginWithWeb3Auth = useLoginWithWeb3Auth();
  const openSignInModalHandler = useCallback(
    () => (isMetaMaskInjected ? openModal(options) : loginWithWeb3Auth()),
    [isMetaMaskInjected, openModal, options, loginWithWeb3Auth]
  );

  return openSignInModalHandler;
};

const Footnote = styled.span`
  font-size: 11px;
  display: flex;
  flex-direction: column;
`;

export const SignInModal = () => {
  const { setConnectorType } = useWallet();
  const { isModalOpen, closeModal, isSignUp } = useSignInModalState();

  const actionText = useMemo(() => (isSignUp ? 'Sign Up' : 'Sign In'), [isSignUp]);

  const { login } = useLogin();

  const loginWithMetaMask = useCallback(async () => {
    setConnectorType('METAMASK');
    closeModal();
    await login('METAMASK');
  }, [setConnectorType, closeModal, login]);

  const loginWithWeb3Auth = useLoginWithWeb3Auth();

  const isMetaMaskInjected = useIsMetaMaskInjected();

  if (!isModalOpen) {
    return null;
  }

  return (
    <Modal
      // TODO: change to Sign In post sign up campaign launch
      title={actionText}
      onClick={closeModal}
      mainContainerStyle={css`
        padding: 16px 0;
        align-items: center;
      `}
    >
      <Button onClick={loginWithMetaMask} disabled={!isMetaMaskInjected}>
        {actionText} With MetaMask
      </Button>
      <span>OR</span>
      <Button onClick={loginWithWeb3Auth}>{actionText} With Social Login</Button>
      <Footnote>
        * Don&apos;t have Metamask? Sign up with your Gmail, Twitter, Discord, Twitch, or Facebook
        username and password.
        <br />
        <br />
        If you create an account with one of the above, you will need to transfer cryptocurrency to
        your newly created wallet address in order to make purchases with cryptocurrency. Join our
        Discord for support.
      </Footnote>
    </Modal>
  );
};
