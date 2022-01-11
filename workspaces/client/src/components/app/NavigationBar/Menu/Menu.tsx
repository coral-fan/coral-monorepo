import { Modal } from 'components/ui';
import { getIconComponent } from 'components/ui/icons/utils';
import { Item } from './Item';
import { creditCardSVG, userSVG, warningSVG } from './assets';
import { NotificationItemProp, NotificationItem } from './NotificationItem';

const MENU_ITEM_CONFIGURATION = [
  ['manage credit card', 'CreditCardIcon', creditCardSVG],
  ['profile', 'ProfileIcon', userSVG],
  ['sign out', 'WarningIcon', warningSVG],
];

export type MenuProp = NotificationItemProp;

export const Menu = ({ notificationsCount }: MenuProp) => (
  <Modal>
    <NotificationItem notificationsCount={notificationsCount} />
    {MENU_ITEM_CONFIGURATION.map(([itemText, componentName, iconSVG]) => (
      <Item key={itemText} Icon={getIconComponent(componentName, iconSVG)}>
        {itemText}
      </Item>
    ))}
  </Modal>
);
