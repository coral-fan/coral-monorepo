import styled from '@emotion/styled';
import { Card } from 'components/ui/Card';
import { TimeElapsed } from 'components/ui/TimeElapsed';
import { Notification as NotificationProps } from 'libraries/models/notification';
import tokens from 'styles/tokens';

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Heading = styled.span`
  font-size: 14px;
  line-height: 18px;
  color: ${tokens.color.white};
`;

const Message = styled.span`
  font-size: 10px;
  line-height: 13px;
  color: ${tokens.color.gray};
`;

export const Bottom = ({ message, timestamp }: Omit<NotificationProps, 'heading'>) => (
  <BottomContainer>
    <Message>{message}</Message>
    <TimeElapsed date={timestamp} />
  </BottomContainer>
);

const NotificationContainer = styled(Card)`
  padding: 18px 16px;
  flex-direction: column;
  gap: 3px;
`;

export const Notification = ({ heading, message, timestamp }: NotificationProps) => (
  <NotificationContainer>
    <Heading>{heading}</Heading>
    <Bottom message={message} timestamp={timestamp}></Bottom>
  </NotificationContainer>
);

export type { NotificationProps };
