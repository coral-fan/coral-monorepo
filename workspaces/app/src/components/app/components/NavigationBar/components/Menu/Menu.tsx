import { Link, MenuProfileInfo, Modal } from 'components/ui';
import { useIsAuthenticated, useLogin, useLogout } from 'libraries/authentication';
import { User, useUserUid } from 'libraries/models';
import { Item } from './Item';
import styled from '@emotion/styled';
import tokens from 'styles/tokens';

interface MenuProps {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
  userData?: User;
}

const MenuProfileLink = styled(Link)`
  border-bottom: solid 1px ${tokens.border.color.secondary};
`;

export const Menu = ({ showMenu, setShowMenu, userData }: MenuProps) => {
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

  return (
    <Modal variant="close" onClick={() => setShowMenu(false)}>
      {isAuthenticated && userData && (
        <>
          <MenuProfileLink href={`/user/${uid}`}>
            <MenuProfileInfo
              username={userData.username}
              profilePhoto={userData.profilePhoto}
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
