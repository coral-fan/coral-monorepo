import { css } from '@emotion/react';
import { LogoSpinner } from 'components/app/components/ModalOrComponent/SignInModal/LogoSpinner';
import { Modal } from 'components/ui';
import { useIconSize } from './hooks';

const mainContainerStyle = css`
  align-items: center;
`;

export const CheckingNftModal = () => {
  const iconSize = useIconSize();

  return (
    <Modal title="Checking Your Wallet" mainContainerStyle={mainContainerStyle}>
      <LogoSpinner size={iconSize} />
    </Modal>
  );
};
