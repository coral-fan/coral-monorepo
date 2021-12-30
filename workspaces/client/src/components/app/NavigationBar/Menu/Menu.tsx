import { Fragment } from 'react';
import { Modal } from 'components/ui';
import { MenuItem } from './MenuItem';
import { getIconComponent } from 'components/ui/icons/utils';
import { creditCardSVG, userSVG, warningSVG } from './assets';
import { Divider } from './Divider';
import { NotificationMenuItemProp, NotificationMenuItem } from './NotificationMenuItem';

const MENU_ITEM_CONFIGURATION = [
  ['manage credit card', 'CreditCardIcon', creditCardSVG],
  ['profile', 'ProfileIcon', userSVG],
  ['sign out', 'WarningIcon', warningSVG],
];

const menuItems = MENU_ITEM_CONFIGURATION.map(
  ([itemText, componentName, iconSVG], index, array) => (
    <Fragment key={itemText}>
      <Divider isLast={index === array.length - 1} />
      <MenuItem Icon={getIconComponent(componentName, iconSVG)}>{itemText}</MenuItem>
    </Fragment>
  )
);

export type MenuProp = NotificationMenuItemProp;

export const Menu = ({ notificationsCount }: MenuProp) => (
  <Modal>
    <NotificationMenuItem notificationsCount={notificationsCount} />
    {menuItems}
  </Modal>
);
