import { ComponentProps } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { getIconComponent } from 'components/ui/icons/utils';
import xSVG from './X.svg';
import { Card } from 'components/ui/Card';
import { TimeElapsed } from 'components/ui/TimeElapsed';
import { Notification as NotificationProps } from 'libraries/models/notification';
import tokens from 'styles/tokens';
import { BUTTON_BASE_STYLE } from 'components/ui/buttons/consts';

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const CloseIcon = getIconComponent('CloseIcon', xSVG);

const closeButtonStyle = css`
  ${BUTTON_BASE_STYLE};
  background-color: transparent;
`;
const CloseButton = (props: ComponentProps<'button'>) => (
  <button css={closeButtonStyle} {...props}>
    <CloseIcon />
  </button>
);

export const Heading = styled.span`
  font-size: 14px;
  line-height: 18px;
  color: ${tokens.color.white};
`;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  padding: 16px 18px;
  flex-direction: column;
  gap: 3px;
`;

export const Notification = ({ heading, message, timestamp }: NotificationProps) => (
  <NotificationContainer>
    <TopContainer>
      <Heading>{heading}</Heading>
      <CloseButton />
    </TopContainer>
    <Bottom message={message} timestamp={timestamp}></Bottom>
  </NotificationContainer>
);

export type { NotificationProps };
