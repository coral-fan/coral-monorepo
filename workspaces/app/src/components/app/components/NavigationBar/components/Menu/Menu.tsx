import { createElement, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import { CLIENT_ENVIRONMENT } from 'consts';
import { Link, Modal } from 'components/ui';
import { useIsAuthenticated, useLogout } from 'libraries/authentication';
import { useUserUid } from 'libraries/models';
import { UserProfile } from '../../NavigationBar';
import { Item } from './Item';
import { MenuProfileInfo } from '../MenuProfileInfo';
import { useSignInModalState } from 'components/app/components/SignInModal';

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

const ClickableWrapper = styled.div`
  width: fit-content;
`;

export const Menu = ({ userProfile, closeMenuModal }: MenuProps) => {
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

  const { openModal } = useSignInModalState();

  const handleSignIn = useCallback(() => {
    closeMenuModal();
    openModal();
  }, [closeMenuModal, openModal]);

  const unauthenticatedMenuItems: MenuItemProps[] = useMemo(
    () => [
      { name: 'Home', to: '/' },
      { name: 'Sign In', onClick: handleSignIn },
    ],
    [handleSignIn]
  );

  const menuItems = isAuthenticated ? authenticatedMenuItems : unauthenticatedMenuItems;

  return (
    <Modal onClick={closeMenuModal} mainContainerHasNoGap>
      {isAuthenticated && userProfile && (
        <ClickableWrapper>
          {/* TODO: remove conditional renderl logic for sign up campaign */}
          {CLIENT_ENVIRONMENT === 'production' ? (
            <MenuProfileInfo
              username={userProfile.username}
              profilePhoto={userProfile.profilePhoto}
            />
          ) : (
            <MenuProfileInfo
              username={userProfile.username}
              profilePhoto={userProfile.profilePhoto}
            />
          )}
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
