import { createElement, useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Link, Modal } from 'components/ui';
import { useIsAuthenticated, useLogout } from 'libraries/authentication';
import { useUserUid } from 'libraries/models';
import { UserProfile } from '../../NavigationBar';
import { Item } from './Item';
import { MenuProfileInfo } from '../MenuProfileInfo';
import { useOpenSignInModal } from 'components/app/components/SignInModal';
import { useWallet } from 'libraries/blockchain';
import { WithdrawAvaxModal } from '../WithdrawAvaxModal';

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
  const { connectorType, balance } = useWallet();
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const handleLogout = useCallback(() => {
    logout();
    closeMenuModal();
  }, [logout, closeMenuModal]);

  const handleWithdraw = useCallback(() => {
    setShowWithdrawModal(true);
  }, []);

  const openSignInModal = useOpenSignInModal();

  const handleSignIn = useCallback(() => {
    closeMenuModal();
    openSignInModal();
  }, [closeMenuModal, openSignInModal]);

  const menuItems: MenuItemProps[] = useMemo(
    () => [
      { name: 'Home', to: '/' },
      { name: 'Coral Editorial', to: 'https://editorial.coral.fan/' },
      isAuthenticated
        ? { name: 'Sign Out', onClick: handleLogout }
        : { name: 'Sign In', onClick: handleSignIn },
    ],
    [isAuthenticated, handleSignIn, handleLogout]
  );

  const isWithdrawAvailable = useMemo(() => {
    if (balance && balance > 0) return true;
    return false;
  }, [balance]);

  return showWithdrawModal ? (
    <WithdrawAvaxModal
      closeWithdrawModal={() => {
        setShowWithdrawModal(false);
        closeMenuModal();
      }}
    />
  ) : (
    <Modal onClick={closeMenuModal} mainContainerHasNoGap>
      {isAuthenticated && userProfile && (
        <ClickableWrapper>
          <Link href={`/user/${uid}`} onClick={closeMenuModal}>
            <MenuProfileInfo
              username={userProfile.username}
              profilePhoto={userProfile.profilePhoto}
            />
          </Link>
          {/* <NotificationItem handleCloseMenu={useCloseMenuModal} notificationsCount={notificationsCount} /> */}
        </ClickableWrapper>
      )}
      {isWithdrawAvailable && isAuthenticated && connectorType === 'WEB3AUTH' && (
        <Item key="withdraw" handleCloseMenu={closeMenuModal} onClick={handleWithdraw}>
          {`Withdraw AVAX`}
        </Item>
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
