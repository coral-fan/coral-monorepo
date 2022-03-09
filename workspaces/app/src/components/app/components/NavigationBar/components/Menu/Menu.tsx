import { Link, MenuProfileInfo, Modal } from 'components/ui';
import { useIsAuthenticated, useLogin, useLogout } from 'libraries/authentication';
import { useUserUid } from 'libraries/models';
import { Item } from './Item';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { UserProfile } from '../../NavigationBar';
import { useCallback } from 'react';

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

  if (!isMenuOpen) {
    return null;
  }

  const useCloseMenuModal = () => useCallback(() => setIsMenuOpen(false), []);

  return (
    <Modal variant="close" onClick={useCloseMenuModal}>
      {isAuthenticated && userProfileData && (
        <>
          <MenuProfileLink href={`/user/${uid}`}>
            <MenuProfileInfo
              username={userProfileData.username}
              profilePhoto={userProfileData.profilePhoto}
              walletBalance={0}
            />
          </MenuProfileLink>
          {/* <NotificationItem notificationsCount={notificationsCount} /> */}
        </>
      )}
      {items.map(({ to, label, onClick }) =>
        to ? (
          <Item to={to} key={label} handleItemClick={useCloseMenuModal}>
            {label}
          </Item>
        ) : (
          <Item onClick={onClick} key={label} handleItemClick={useCloseMenuModal}>
            {label}
          </Item>
        )
      )}
    </Modal>
  );
};
