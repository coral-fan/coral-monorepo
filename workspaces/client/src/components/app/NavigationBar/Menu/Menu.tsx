import { Modal } from 'components/ui';
import { MenuItem } from './MenuItem';
import { getIconComponent } from 'components/ui/icons/utils';
import { creditCardSVG, userSVG, warningSVG } from './assets';
import { NotificationMenuItemProp, NotificationMenuItem } from './NotificationMenuItem';

const MENU_ITEM_CONFIGURATION = [
  ['manage credit card', 'CreditCardIcon', creditCardSVG],
  ['profile', 'ProfileIcon', userSVG],
  ['sign out', 'WarningIcon', warningSVG],
];

export type MenuProp = NotificationMenuItemProp;

export const Menu = ({ notificationsCount }: MenuProp) => (
  <Modal>
    <NotificationMenuItem notificationsCount={notificationsCount} />
    {MENU_ITEM_CONFIGURATION.map(([itemText, componentName, iconSVG]) => (
      <MenuItem key={itemText} Icon={getIconComponent(componentName, iconSVG)}>
        {itemText}
      </MenuItem>
    ))}
  </Modal>
);
