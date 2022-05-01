import { useCallback } from 'react';
import create from 'zustand';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Modal } from 'components/ui';
import { useLogin } from 'libraries/authentication';
import { useWallet } from 'libraries/blockchain';

interface SignInModalState {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useSignInModalState = create<SignInModalState>((set) => ({
  isModalOpen: false,
  openModal: () => set(() => ({ isModalOpen: true })),
  closeModal: () => set(() => ({ isModalOpen: false })),
}));

const SignUpButton = styled(Button)`
  max-width: 65%;
`;

export const SignInModal = () => {
  const { setConnectorType } = useWallet();
  const { isModalOpen, closeModal } = useSignInModalState();
  const { login } = useLogin();

  const loginWithMetaMask = useCallback(async () => {
    setConnectorType('METAMASK');
    closeModal();
    await login('METAMASK');
  }, [setConnectorType, closeModal, login]);

  const loginWithWeb3Auth = useCallback(async () => {
    setConnectorType('WEB3AUTH');
    closeModal();
    await login('WEB3AUTH');
  }, [setConnectorType, closeModal, login]);

  if (!isModalOpen) {
    return null;
  }

  return (
    <Modal
      // TODO: change to Sign In post sign up campaign launch
      title={'Sign Up'}
      onClick={closeModal}
      mainContainerStyle={css`
        padding: 16px 0;
        align-items: center;
      `}
    >
      <SignUpButton onClick={loginWithMetaMask}>Sign Up With MetaMask</SignUpButton>
      <span>OR</span>
      <SignUpButton onClick={loginWithWeb3Auth}>Sign Up With Social Login</SignUpButton>
    </Modal>
  );
};
