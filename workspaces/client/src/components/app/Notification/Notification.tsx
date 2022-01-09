import { ComponentProps } from 'react';
import { CSSTransition } from 'react-transition-group';
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

const CLASS_NAME = 'notification';
const TIMEOUT = 500;

const NotificationContainer = styled(Card)`
  padding: 16px 18px;
  flex-direction: column;
  gap: 3px;
  transition: transform ${TIMEOUT}ms;

  &.${CLASS_NAME}-appear, &.${CLASS_NAME}-exit-active {
    transform: translateX(9999px);
  }

  &.${CLASS_NAME}-appear-active, &.${CLASS_NAME}-exit {
    transform: translateX(0px);
  }
`;

export const Notification = ({ heading, message, timestamp }: NotificationProps) => (
  <CSSTransition in={true} appear={true} timeout={TIMEOUT} classNames={CLASS_NAME}>
    <NotificationContainer>
      <TopContainer>
        <Heading>{heading}</Heading>
        <CloseButton />
      </TopContainer>
      <Bottom message={message} timestamp={timestamp}></Bottom>
    </NotificationContainer>
  </CSSTransition>
);

export type { NotificationProps };
