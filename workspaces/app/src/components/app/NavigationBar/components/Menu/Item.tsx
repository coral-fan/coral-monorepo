import styled from '@emotion/styled';
import { getIconComponent } from 'components/ui/icons/utils';
import { FC } from 'react';
import tokens from 'styles/tokens';
import { itemBorderBottomStyle } from '../styles';

type Icon = ReturnType<typeof getIconComponent>;

type ItemProps = {
  Icon: Icon;
  notificationCount?: number;
};

const Container = styled.div`
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

  ${itemBorderBottomStyle}

  &:last-child {
    border-top: solid ${tokens.border.color.primary} 1px;
  }
`;

export const Item: FC<ItemProps> = ({ Icon, children }) => (
  <Container>
    <Icon size={20} />
    {children}
  </Container>
);
