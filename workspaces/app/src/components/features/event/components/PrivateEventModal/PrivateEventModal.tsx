import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Modal } from 'components/ui';
import { getIconComponent } from 'components/ui/icons/utils';
import { useIsDesktop } from 'libraries/window';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';
import privateEventSVG from './lock.svg';

const PrivateEventIcon = getIconComponent('PrivateEventIcon', privateEventSVG);

const Message = styled.span`
  --font-size: ${tokens.font.size.md};

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    --font-size: ${tokens.font.size.lg};
  }
  font-size: var(--font-size);
`;

const mainContainerStyle = css`
  align-items: center;
  gap: 16px;
`;

export const PrivateEventModal = () => {
  const isDesktop = useIsDesktop();
  return (
    <Modal title="This Is A Private Event" mainContainerStyle={mainContainerStyle}>
      <PrivateEventIcon size={isDesktop ? 275 : 175} />
      <Message>Please log in so we can check your wallet.</Message>
      <Button>Login</Button>
    </Modal>
  );
};
