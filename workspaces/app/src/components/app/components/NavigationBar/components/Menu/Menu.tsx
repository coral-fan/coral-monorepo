import { createElement, useCallback } from 'react';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { Link, Modal } from 'components/ui';
import { useIsAuthenticated, useLogin, useLogout } from 'libraries/authentication';
import { useUserUid } from 'libraries/models';
import { UserProfile } from '../../NavigationBar';
import { Item } from './Item';
import { MenuProfileInfo } from '../MenuProfileInfo';
import { usePush } from 'libraries/authentication/hooks/usePush';
import { useRouter } from 'next/router';

interface MenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  userProfile?: UserProfile;
}

interface BaseMenuItemProp {
  name: string;
}

interface LinkItemProps extends BaseMenuItemProp {
  to: string;
  onClick?: never;
}

interface LinkButtonItemProps extends BaseMenuItemProp {
  onClick: () => void;
  to?: never;
}

type MenuItemProps = LinkItemProps | LinkButtonItemProps;

const MenuProfileLink = styled(Link)`
  border-bottom: solid 1px ${tokens.border.color.secondary};
`;

export const Menu = ({ isMenuOpen, setIsMenuOpen, userProfile }: MenuProps) => {
  const { login } = useLogin();
  const logout = useLogout();
  const isAuthenticated = useIsAuthenticated();
  const uid = useUserUid();
  const push = usePush();
  const currentPath = useRouter().pathname;

  const handleLogout = () => {
    logout();
    if (currentPath !== '/') {
      push('/');
    }
  };

  const AUTHENTICATED_MENU_ITEMS: MenuItemProps[] = [
    { name: 'Home', to: '/' },
    { name: 'Sign Out', onClick: handleLogout },
  ];

  const UNAUTHENTICATED_MENU_ITEMS: MenuItemProps[] = [
    { name: 'Home', to: '/' },
    { name: 'Sign In', onClick: login },
  ];

  const items = isAuthenticated ? AUTHENTICATED_MENU_ITEMS : UNAUTHENTICATED_MENU_ITEMS;

  const closeMenuModal = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen]);

  if (!isMenuOpen) {
    return null;
  }

  return (
    <Modal variant="close" onClick={closeMenuModal}>
      {isAuthenticated && userProfile && (
        <>
          <MenuProfileLink href={`/user/${uid}`} onClick={closeMenuModal}>
            <MenuProfileInfo
              username={userProfile.username}
              profilePhoto={userProfile.profilePhoto}
              walletBalance={0}
            />
          </MenuProfileLink>
          {/* <NotificationItem handleCloseMenu={useCloseMenuModal} notificationsCount={notificationsCount} /> */}
        </>
      )}
      {items.map(({ to, name, onClick }) =>
        createElement(
          Item,
          { key: name, handleCloseMenu: closeMenuModal, ...(to ? { to } : { onClick }) },
          name
        )
      )}
    </Modal>
  );
};
