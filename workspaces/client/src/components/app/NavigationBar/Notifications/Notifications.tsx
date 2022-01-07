import styled from '@emotion/styled';
import { Fragment } from 'react';
import { Notification } from 'libraries/models';
import { Modal } from 'components/ui';
import { Divider } from '../Divider';
import { Bottom, Heading, NotificationProps } from '../../Notification';

const NotificationContainer = styled.div`
  padding: 14px 0;
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
    {notifications?.map((notification, i, array) => (
      <Fragment key={i}>
        <NotificationItem {...notification} />
        {i === array.length - 1 ? null : <Divider />}
      </Fragment>
    ))}
  </Modal>
);
