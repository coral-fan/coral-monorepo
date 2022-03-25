import styled from '@emotion/styled';

import { HamburgerMenuButton, Menu, LogoHomeLink } from './components';
import { useCallback, useState } from 'react';
import { User } from 'libraries/models';
import { useObservable } from 'libraries/utils';
import { getUserProfile$ } from './observables';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';
// import { NAVIGATION_BAR_VERTICAL_PADDING } from './consts';

const { mobile, desktop } = tokens.layout.padding;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: ${mobile.vertical} ${mobile.horizontal};

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    padding: ${desktop.vertical} ${desktop.horizontal};
    /* padding: ${NAVIGATION_BAR_VERTICAL_PADDING.MOBILE}; */

    /* @media (min-width: ${DESKTOP_BREAKPOINT}) { */
    /* padding: ${NAVIGATION_BAR_VERTICAL_PADDING.DESKTOP} 70px; */
  }
`;

export type UserProfile = Pick<User, 'username' | 'profilePhoto'>;

export const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const userProfile = useObservable(getUserProfile$, undefined);

  const openMenuModal = useCallback(() => setIsMenuOpen(true), [setIsMenuOpen]);

  return (
    <Container>
      <LogoHomeLink />
      <HamburgerMenuButton onClick={openMenuModal} />
      <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} userProfile={userProfile} />
    </Container>
  );
};
