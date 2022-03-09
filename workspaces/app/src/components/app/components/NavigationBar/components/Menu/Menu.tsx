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
  userProfileData?: UserProfile;
}

const MenuProfileLink = styled(Link)`
  border-bottom: solid 1px ${tokens.border.color.secondary};
`;

export const Menu = ({ isMenuOpen, setIsMenuOpen, userProfileData }: MenuProps) => {
  const { login } = useLogin();
  const logout = useLogout();
  const isAuthenticated = useIsAuthenticated();
  const uid = useUserUid();

  const AUTHENTICATED_MENU_ITEMS = [
    { label: 'Home', to: '/' },
    { label: 'Sign Out', onClick: logout },
  ];

  const UNAUTHENTICATED_MENU_ITEMS = [
    { label: 'Home', to: '/' },
    { label: 'Sign In', onClick: login },
  ];

  const items = isAuthenticated ? AUTHENTICATED_MENU_ITEMS : UNAUTHENTICATED_MENU_ITEMS;

  const closeMenuModal = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen]);

  if (!isMenuOpen) {
    return null;
  }

  return (
    <Modal variant="close" onClick={closeMenuModal}>
      {isAuthenticated && userProfileData && (
        <>
          <MenuProfileLink href={`/user/${uid}`}>
            <MenuProfileInfo
              username={userProfileData.username}
              profilePhoto={userProfileData.profilePhoto}
              walletBalance={0}
            />
          </MenuProfileLink>
          {/* <NotificationItem handleItemClick={useCloseMenuModal} notificationsCount={notificationsCount} /> */}
        </>
      )}
      {items.map(({ to, label, onClick }) => {
        const baseItemProps = { key: label, handleItemClick: closeMenuModal };
        const itemProps = {
          ...(to ? { ...baseItemProps, ...{ to } } : { ...baseItemProps, ...{ onClick } }),
        };
        return createElement(Item, itemProps, label);
      })}
    </Modal>
  );
};
