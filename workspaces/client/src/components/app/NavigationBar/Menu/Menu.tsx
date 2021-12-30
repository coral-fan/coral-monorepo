import styled from '@emotion/styled';
import tokens from 'styles/tokens';
import { MenuItem } from './MenuItem';
import { getIconComponent } from 'components/ui/icons/utils';
import { creditCardSVG, userSVG, warningSVG } from './assets';
import { Divider } from './Divider';
import { NotificationMenuItemProp, NotificationMenuItem } from './NotificationMenuItem';
import { Fragment } from 'react';

const menuItems = [
  ['manage credit card', 'CreditCardIcon', creditCardSVG],
  ['profile', 'ProfileIcon', userSVG],
  ['sign out', 'WarningIcon', warningSVG],
].map(([itemText, componentName, iconSVG], index, array) => (
  <Fragment key={itemText}>
    <Divider isLast={index === array.length - 1} />
    <MenuItem Icon={getIconComponent(componentName, iconSVG)}>{itemText}</MenuItem>
  </Fragment>
));

const MenuContainer = styled.div`
  width: 100%;
  background-color: ${tokens.color.background.tertiary};
  color: ${tokens.color.white};
  padding: 8px 18px;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.5);
  border-radius: 12px;
`;

export type MenuProp = NotificationMenuItemProp;

export const Menu = ({ notificationsCount }: MenuProp) => (
  <MenuContainer>
    <NotificationMenuItem notificationsCount={notificationsCount} />
    {menuItems}
  </MenuContainer>
);
