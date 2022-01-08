import styled from '@emotion/styled';
import { MenuItem } from './MenuItem';
import { getIconComponent } from 'components/ui/icons/utils';
import { bellSVG } from './assets';
import { css } from '@emotion/react';
import tokens from 'styles/tokens';

export interface NotificationMenuItemProp {
  notificationsCount: number;
}
const NotificationBadge = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${tokens.color.red};
  border-radius: 50%;
`;
const NotificationContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const getFontSizeStyle = (count: number) => css`
  font-size: ${count > 99 ? 8 : count > 9 ? 11 : 14}px;
`;
export const NotificationMenuItem = ({ notificationsCount }: NotificationMenuItemProp) => (
  <MenuItem Icon={getIconComponent('NotificationIcon', bellSVG)}>
    <NotificationContent>
      notifications
      {notificationsCount > 0 && (
        <NotificationBadge css={getFontSizeStyle(notificationsCount)}>
          {notificationsCount}
        </NotificationBadge>
      )}
    </NotificationContent>
  </MenuItem>
);
