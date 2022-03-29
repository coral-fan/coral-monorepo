import { ButtonLink, Message, Modal } from 'components/ui';

interface InstallMetaMaskModalProps {
  closeModal: () => void;
}

export const InstallMetaMaskModal = ({ closeModal }: InstallMetaMaskModalProps) => (
  <Modal title="MetaMask Is Not Installed" onClick={closeModal}>
    <Message>Please install MetaMask Wallet Browser Extension.</Message>
    <ButtonLink href="https://metamask.io/download/">Install MetaMask</ButtonLink>
  </Modal>
);
