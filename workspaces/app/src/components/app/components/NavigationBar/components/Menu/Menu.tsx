import { Modal, MenuProfileInfo, MenuProfileProps } from 'components/ui';
import { Item } from './Item';
import {
  NotificationItemProp,
  // NotificationItem
} from './NotificationItem';

const AUTHENTICATED_MENU_ITEMS = ['Manage Credit Card', 'Home', 'Sign Out'];
const UNAUTHENTICATED_MENU_ITEMS = ['Home', 'Sign In'];

export interface MenuProp extends NotificationItemProp, MenuProfileProps {
  isAuthenticated: boolean;
}

export const Menu = ({
  // notificationsCount,
  username,
  profilePhoto,
  walletBalance,
  isAuthenticated,
}: MenuProp) => {
  const items = isAuthenticated ? AUTHENTICATED_MENU_ITEMS : UNAUTHENTICATED_MENU_ITEMS;

  return (
    <Modal>
      {isAuthenticated && (
        <>
          <MenuProfileInfo
            username={username}
            profilePhoto={profilePhoto}
            walletBalance={walletBalance}
          />
          {/* <NotificationItem notificationsCount={notificationsCount} /> */}
        </>
      )}
      {items.map((item) => (
        <Item key={item}>{item}</Item>
      ))}
    </Modal>
  );
};
