import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { getIconComponent } from 'components/ui/icons/utils';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';
import { Button, ButtonLink, Modal } from 'components/ui';
import { useIsDesktop } from 'libraries/window';
import privateEventSVG from './lock.svg';
import { useIsAuthenticated, useLogin } from 'libraries/authentication';

const mainContainerStyle = css`
  align-items: center;
  gap: 16px;
`;

const PrivateEventIcon = getIconComponent('PrivateEventIcon', privateEventSVG);

const Message = styled.span`
  --font-size: ${tokens.font.size.md};

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    --font-size: ${tokens.font.size.lg};
  }
  font-size: var(--font-size);
`;

interface PrivateEventModalProps {
  collectionId: string;
}

export const PrivateEventModal = ({ collectionId }: PrivateEventModalProps) => {
  const isDesktop = useIsDesktop();
  const isAuthenticated = useIsAuthenticated();

  const { login } = useLogin();

  return (
    <Modal title="This Is A Private Event" mainContainerStyle={mainContainerStyle}>
      <PrivateEventIcon size={isDesktop ? 275 : 175} />
      <Message>
        {isAuthenticated
          ? 'This event is for members and ticket holders only. Buy a ticket now for this special event and exclusive perks.'
          : 'Please log in so we can check your wallet.'}
      </Message>
      {isAuthenticated ? (
        <ButtonLink href={`/collection/${collectionId}`}>Buy Ticket</ButtonLink>
      ) : (
        <Button onClick={login}>Login</Button>
      )}
    </Modal>
  );
};
