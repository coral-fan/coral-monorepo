import styled from '@emotion/styled';

import { HamburgerMenuButton, Menu, LogoHomeLink, InstallMetaMaskModal } from './components';
import { useCallback, useState } from 'react';
import { User } from 'libraries/models';
import { useObservable } from 'libraries/utils';
import { getUserProfile$ } from './observables';
import tokens, { QUERY } from 'styles/tokens';

const { mobile, desktop } = tokens.layout.padding;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: ${mobile.vertical} ${mobile.horizontal};

  @media ${QUERY.LAPTOP} {
    padding: ${desktop.vertical} ${desktop.horizontal};
  }
`;

export type UserProfile = Pick<User, 'username' | 'profilePhoto'>;

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userProfile = useObservable(getUserProfile$, undefined);

  const openMenuModal = useCallback(() => setIsMenuOpen(true), []);
  const closeMenuModal = useCallback(() => setIsMenuOpen(false), []);

  const [isInstallMetaMaskModalOpen, setIsInstallMetaMaskModalOpen] = useState(false);

  const openInstallMetaMaskModal = useCallback(() => {
    closeMenuModal();
    setIsInstallMetaMaskModalOpen(true);
  }, [closeMenuModal]);
  const closeInstallMetaMaskModal = useCallback(() => setIsInstallMetaMaskModalOpen(false), []);

  return (
    <>
      {isInstallMetaMaskModalOpen && (
        <InstallMetaMaskModal closeModal={closeInstallMetaMaskModal} />
      )}
      {isMenuOpen && (
        <Menu
          closeMenuModal={closeMenuModal}
          openInstallMetaMaskModal={openInstallMetaMaskModal}
          userProfile={userProfile}
        />
      )}
      <Container>
        <LogoHomeLink />
        <HamburgerMenuButton onClick={openMenuModal} />
      </Container>
    </>
  );
};
