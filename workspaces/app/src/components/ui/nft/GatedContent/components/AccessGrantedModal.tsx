import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { LogoIcon, Modal } from 'components/ui';
import { useIconSize } from './hooks';

const BlackLogo = styled(LogoIcon)`
  filter: invert(1);
`;

const mainContainerStyle = css`
  align-items: center;
  padding: 32px 0;
`;

export const AccessGrantedModal = () => {
  const iconSize = useIconSize();
  return (
    <Modal variant="contrast" title="Access Granted" mainContainerStyle={mainContainerStyle}>
      <BlackLogo size={iconSize} />
    </Modal>
  );
};
