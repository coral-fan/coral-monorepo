import styled from '@emotion/styled';
import { getIconComponent } from 'components/ui/icons/utils';
import { FC } from 'react';

type Icon = ReturnType<typeof getIconComponent>;

type MenuItemProps = {
  Icon: Icon;
  notificationCount?: number;
};

const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 18.5px;
  text-transform: uppercase;
  padding: 15px 10px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 15px;
  letter-spacing: 0.053em;
`;

export const MenuItem: FC<MenuItemProps> = ({ Icon, children }) => (
  <MenuItemContainer>
    <Icon size={20} />
    {children}
  </MenuItemContainer>
);
