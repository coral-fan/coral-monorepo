import { css } from '@emotion/react';
import { getIconComponent } from 'components/ui/icons/utils';
import { Button, ButtonLink, Message, Modal } from 'components/ui';
import privateEventSVG from './lock.svg';
import { useLogin } from 'libraries/authentication';
import { useIconSize } from '../../hooks';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

const mainContainerStyle = css`
  align-items: center;
  gap: 16px;
`;

const PrivateEventIcon = getIconComponent('PrivateEventIcon', privateEventSVG);

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
      <PrivateEventIcon size={iconSize} />
      <Message>{message}</Message>
      {actionElement}
    </Modal>
  );
};
