import styled from '@emotion/styled';
import { Item } from './Item';
import { css } from '@emotion/react';
import tokens, { QUERIES } from 'styles/tokens';

export interface NotificationItemProp {
  notificationsCount: number;
  handleCloseMenu: () => void;
}
const Badge = styled.div`
  height: 22px;
  width: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${tokens.font.size.md};
  line-height: ${tokens.font.line_height.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  font-weight: ${tokens.font.weight.normal};
  color: ${tokens.font.color.contrast};
  background-color: ${tokens.background.color.brand};
  border-radius: 50%;

  @media ${QUERIES.laptopAndUp} {
    height: 24px;
    width: 24px;
  }
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
`;
const getFontSizeStyle = (count: number) => css`
  font-size: ${count > 99 ? 8 : count > 9 ? 11 : 14}px;
`;
export const NotificationItem = ({ notificationsCount, handleCloseMenu }: NotificationItemProp) => (
  <Item handleCloseMenu={handleCloseMenu}>
    <Content>
      notifications
      {notificationsCount > 0 && (
        <Badge css={getFontSizeStyle(notificationsCount)}>{notificationsCount}</Badge>
      )}
    </Content>
  </Item>
);
