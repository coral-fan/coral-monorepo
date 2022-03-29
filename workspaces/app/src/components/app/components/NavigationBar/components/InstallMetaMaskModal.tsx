import { ButtonLink, Message, Modal } from 'components/ui';

interface InstallMetaMaskModalProps {
  closeModal: () => void;
}

export const InstallMetaMaskModal = ({ closeModal }: InstallMetaMaskModalProps) => (
  <Modal title="Install MetaMask" onClick={closeModal}>
    <Message>Please install MetaMask.</Message>
    <ButtonLink href="https://metamask.io/download/">Install MetaMask</ButtonLink>
  </Modal>
);
