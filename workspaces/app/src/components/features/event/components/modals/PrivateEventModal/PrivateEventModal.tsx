import { css, keyframes } from '@emotion/react';
import { getIconComponent } from 'components/ui/icons/utils';
import { Button, ButtonLink, Message, Modal } from 'components/ui';
import privateEventSVG from './lock.svg';
import { useLogin } from 'libraries/authentication';
import { useIconSize } from '../hooks';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';

const mainContainerStyle = css`
  align-items: center;
`;

const LockIcon = getIconComponent('LockIcon', privateEventSVG);

const lockRotation = keyframes`
  0% {
    transform: rotateY(90deg) rotate(90deg);
  }
  100% {
    transform: rotateY(0deg) rotate(0deg);
  }`;

const lockWiggle = keyframes`
 0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(-25px);
  }
  50% {
    transform: translateX(25px);
  }
  75% {
    transform: translateX(-25px);
  }
  100% {
    transform: translateX(0px);
  }
`;

const AnimatedLockIcon = styled(LockIcon)`
  transform: rotateY(-90deg);
  transform-style: preserve-3d;
  animation: ${lockRotation} 1s ease-in-out forwards, ${lockWiggle} 0.25s 1.25s ease-in-out;
`;

interface BuyTicketButtonProps {
  collectionId: string;
}

export const BuyTicketButton = ({ collectionId }: BuyTicketButtonProps) => (
  <ButtonLink href={`/collection/${collectionId}`}>Buy Ticket</ButtonLink>
);

export const LoginButton = () => {
  const { login } = useLogin();
  return <Button onClick={login}>Login</Button>;
};

interface PrivateEventModalProps {
  message: string;
  actionElement: EmotionJSX.Element;
}

export const PrivateEventModal = ({ message, actionElement }: PrivateEventModalProps) => {
  const iconSize = useIconSize();

  return (
    <Modal title="This Is A Private Event" mainContainerStyle={mainContainerStyle}>
      <AnimatedLockIcon size={iconSize} />
      <Message>{message}</Message>
      {actionElement}
    </Modal>
  );
};
