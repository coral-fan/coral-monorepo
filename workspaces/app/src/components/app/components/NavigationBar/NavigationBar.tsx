import styled from '@emotion/styled';

import { HamburgerMenuButton, Menu, LogoHomeLink } from './components';
import { useCallback, useState } from 'react';
import { User } from 'libraries/models';
import { useObservable } from 'libraries/utils';
import { getUserProfile$ } from './observables';
import tokens, { QUERY } from 'styles/tokens';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

const { mobile, desktop } = tokens.layout.padding;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const homePageStyle = css`
  height: 0;
  top: ${mobile.vertical};

  @media ${QUERY.LAPTOP} {
    top: ${desktop.vertical};
  }
`;

const otherPagesStyle = css`
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

  const router = useRouter();

  const isHomePage = router.route === '/';

  return (
    <>
      {isMenuOpen && <Menu closeMenuModal={closeMenuModal} userProfile={userProfile} />}
      <Container css={isHomePage ? homePageStyle : otherPagesStyle}>
        <LogoHomeLink />
        <HamburgerMenuButton onClick={openMenuModal} />
      </Container>
    </>
  );
};
