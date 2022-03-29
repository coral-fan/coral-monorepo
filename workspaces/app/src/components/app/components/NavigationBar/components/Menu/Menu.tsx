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
import { isMetaMaskInjected } from 'libraries/blockchain';

interface MenuProps {
  userProfile?: UserProfile;
  openInstallMetaMaskModal: () => void;
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

export const Menu = ({ userProfile, openInstallMetaMaskModal, closeMenuModal }: MenuProps) => {
  const { login } = useLogin();
  const logout = useLogout();
  const isAuthenticated = useIsAuthenticated();
  const uid = useUserUid();
  const push = usePush();
  const currentPath = useRouter().pathname;

  const handleLogout = useCallback(() => {
    logout();
    if (currentPath !== '/') {
      push('/');
    }
  }, [logout, currentPath, push]);

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
      { name: 'Sign In', onClick: isMetaMaskInjected() ? login : openInstallMetaMaskModal },
    ],
    [openInstallMetaMaskModal, login]
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
              walletBalance={0}
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
