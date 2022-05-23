import styled from '@emotion/styled';

import { HamburgerMenuButton, Menu, LogoHomeLink } from './components';
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
  padding: ${mobile.vertical} 0;

  @media ${QUERY.LAPTOP} {
    padding: ${desktop.vertical} 0;
  }
`;

export type UserProfile = Pick<User, 'username' | 'profilePhoto'>;

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userProfile = useObservable(getUserProfile$, undefined);

  const openMenuModal = useCallback(() => setIsMenuOpen(true), []);
  const closeMenuModal = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      {isMenuOpen && <Menu closeMenuModal={closeMenuModal} userProfile={userProfile} />}
      <Container>
        <LogoHomeLink />
        <HamburgerMenuButton onClick={openMenuModal} />
      </Container>
    </>
  );
};
