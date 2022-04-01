import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { LogoSpinner } from 'components/app/components/ModalOrComponent/SignInModal/LogoSpinner';
import { Modal } from 'components/ui';
import { useIconSize } from './hooks';

const mainContainerStyle = css`
  align-items: center;
`;

const rotate = keyframes`
  0% {
    transform: rotateY(-90deg);
  }
  100% {
    transform: rotateY(0deg);
}
`;

const rotatingEntryStyle = css`
  transform: rotateY(-90deg);
  transform-style: preserve-3d;
  animation: ${rotate} 1s 2s ease-in-out forwards;
`;

export const CheckingNftModal = () => {
  const iconSize = useIconSize();

  return (
    <Modal
      title="Checking Your Wallet"
      contentStyle={rotatingEntryStyle}
      mainContainerStyle={mainContainerStyle}
    >
      <LogoSpinner size={iconSize} />
    </Modal>
  );
};
