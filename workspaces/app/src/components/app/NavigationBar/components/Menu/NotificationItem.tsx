import styled from '@emotion/styled';
import { Item } from './Item';
import { getIconComponent } from 'components/ui/icons/utils';
import { bellSVG } from './assets';
import { css } from '@emotion/react';
import tokens from 'styles/tokens';

export interface NotificationItemProp {
  notificationsCount: number;
}
const Badge = styled.div`
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${tokens.color.background.red};
  border-radius: 50%;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const getFontSizeStyle = (count: number) => css`
  font-size: ${count > 99 ? 8 : count > 9 ? 11 : 14}px;
`;
export const NotificationItem = ({ notificationsCount }: NotificationItemProp) => (
  <Item Icon={getIconComponent('NotificationIcon', bellSVG)}>
    <Content>
      notifications
      {notificationsCount > 0 && (
        <Badge css={getFontSizeStyle(notificationsCount)}>{notificationsCount}</Badge>
      )}
    </Content>
  </Item>
);
