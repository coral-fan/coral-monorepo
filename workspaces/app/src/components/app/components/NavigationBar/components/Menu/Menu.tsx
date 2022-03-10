import { Link, MenuProfileInfo, Modal } from 'components/ui';
import { useIsAuthenticated, useLogin, useLogout } from 'libraries/authentication';
import { useUserUid } from 'libraries/models';
import { Item } from './Item';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { UserProfile } from '../../NavigationBar';
import { createElement, useCallback } from 'react';

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

  const AUTHENTICATED_MENU_ITEMS: MenuItemProps[] = [
    { name: 'Home', to: '/' },
    { name: 'Sign Out', onClick: logout },
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
          <MenuProfileLink href={`/user/${uid}`}>
            <MenuProfileInfo
              username={userProfile.username}
              profilePhoto={userProfile.profilePhoto}
              walletBalance={0}
            />
          </MenuProfileLink>
          {/* <NotificationItem onItemClick={useCloseMenuModal} notificationsCount={notificationsCount} /> */}
        </>
      )}
      {items.map(({ to, name, onClick }) => {
        return createElement(
          Item,
          { key: name, onItemClick: closeMenuModal, ...(to ? { to } : { onClick }) },
          name
        );
      })}
    </Modal>
  );
};
