import { Link, MenuProfileInfo, Modal } from 'components/ui';
import { useIsAuthenticated, useLogin, useLogout } from 'libraries/authentication';
import { useUserUid } from 'libraries/models';
import { Item } from './Item';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { UserProfile } from '../../NavigationBar';

interface MenuProps {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
  userProfileData?: UserProfile;
}

const MenuProfileLink = styled(Link)`
  border-bottom: solid 1px ${tokens.border.color.secondary};
`;

export const Menu = ({ showMenu, setShowMenu, userProfileData }: MenuProps) => {
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

  if (!showMenu) {
    return null;
  }

  const closeMenuModal = () => setShowMenu(false);

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
          {/* <NotificationItem notificationsCount={notificationsCount} /> */}
        </>
      )}
      {items.map(({ to, label, onClick }) =>
        to ? (
          <Item to={to} key={label} setShowMenu={setShowMenu}>
            {label}
          </Item>
        ) : (
          <Item onClick={onClick} key={label} setShowMenu={setShowMenu}>
            {label}
          </Item>
        )
      )}
    </Modal>
  );
};
