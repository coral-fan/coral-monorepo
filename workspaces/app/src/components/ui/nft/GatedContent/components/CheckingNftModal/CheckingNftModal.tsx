import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Modal } from 'components/ui';
import { getIconComponent } from 'components/ui/icons/utils';
import { useIconSize } from '../hooks';
import ticketSVG from './ticket.svg';

const mainContainerStyle = css`
  align-items: center;
  padding: 32px 0;
`;

const modalRotation = keyframes`
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
  animation: ${modalRotation} 2s ease-in-out forwards;
`;

const TicketIcon = getIconComponent('LockIcon', ticketSVG);

const ticketRotation = keyframes`
  0% {
    transform: rotateY(90deg);
  }
  100% {
    transform: rotateY(-90deg);
}
`;

const RotatingTicketIcon = styled(TicketIcon)`
  transform: rotateY(-90deg);
  transform-style: preserve-3d;
  animation: ${ticketRotation} 2s 2s ease-in-out 3;
`;

export const CheckingNftModal = () => {
  const iconSize = useIconSize();

  return (
    <Modal
      title="Checking Your Wallet"
      contentStyle={rotatingEntryStyle}
      mainContainerStyle={mainContainerStyle}
    >
      <RotatingTicketIcon size={iconSize} />
    </Modal>
  );
};
