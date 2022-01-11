import styled from '@emotion/styled';
import { Notification } from 'libraries/models';
import { Modal } from 'components/ui';
import { Bottom, Heading, NotificationProps } from '../../Notification';

const NotificationContainer = styled.div`
  padding: 14px 0;

  &:not(:last-child) {
    border-bottom: solid #4b4b4b 1px;
  }
`;

const NotificationItem = ({ heading, message, timestamp }: NotificationProps) => (
  <NotificationContainer>
    <Heading>{heading}</Heading>
    <Bottom message={message} timestamp={timestamp}></Bottom>
  </NotificationContainer>
);

export interface NotificationsProp {
  notifications?: Notification[];
}

export const Notifications = ({ notifications }: NotificationsProp) => (
  <Modal variant="previous" title="Notifications" onClick={() => console.log('clicked')}>
    {notifications?.map((notification, i) => (
      <NotificationItem key={i} {...notification} />
    ))}
  </Modal>
);
