import { createElement, useCallback, useMemo } from 'react';
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
  userProfile?: UserProfile;
  closeMenuModal: () => void;
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

const ClickableWrapper = styled.div`
  width: fit-content;
`;

export const Menu = ({ userProfile, closeMenuModal }: MenuProps) => {
  const { login } = useLogin(closeMenuModal);
  const logout = useLogout();
  const isAuthenticated = useIsAuthenticated();
  const uid = useUserUid();

  const handleLogout = useCallback(() => {
    logout();
    closeMenuModal();
  }, [logout, closeMenuModal]);

  const authenticatedMenuItems: MenuItemProps[] = useMemo(
    () => [
      { name: 'Home', to: '/' },
      { name: 'Sign Out', onClick: handleLogout },
    ],
    [handleLogout]
  );

  const unauthenticatedMenuItems: MenuItemProps[] = useMemo(
    () => [
      { name: 'Home', to: '/' },
      { name: 'Sign In', onClick: login },
    ],
    [login]
  );

  const menuItems = isAuthenticated ? authenticatedMenuItems : unauthenticatedMenuItems;

  return (
    <Modal onClick={closeMenuModal} mainContainerHasNoGap>
      {isAuthenticated && userProfile && (
        <ClickableWrapper>
          <MenuProfileLink href={`/user/${uid}`} onClick={closeMenuModal}>
            <MenuProfileInfo
              username={userProfile.username}
              profilePhoto={userProfile.profilePhoto}
            />
          </MenuProfileLink>
          {/* <NotificationItem handleCloseMenu={useCloseMenuModal} notificationsCount={notificationsCount} /> */}
        </ClickableWrapper>
      )}
      {menuItems.map(({ to, name, onClick }) =>
        createElement(
          Item,
          { key: name, handleCloseMenu: closeMenuModal, ...(to ? { to } : { onClick }) },
          name
        )
      )}
    </Modal>
  );
};
