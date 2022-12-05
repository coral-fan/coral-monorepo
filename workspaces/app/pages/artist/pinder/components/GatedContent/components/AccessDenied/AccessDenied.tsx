import { css, keyframes } from '@emotion/react';
import { getIconComponent } from 'components/ui/icons/utils';
import { Message, ModalCard } from 'components/ui';
import privateEventSVG from './lock.svg';
import { useIconSize } from '../hooks';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  margin: auto 0;
  flex-direction: column;
  align-items: center;
`;

const mainContainerStyle = css`
  align-items: center;
  padding: 16px 0;
`;

const LockIcon = getIconComponent('LockIcon', privateEventSVG);

const lockRotation = keyframes`
  0% {
    transform: rotateY(90deg) rotate(90deg);
  }
  100% {
    transform: rotateY(0deg) rotate(0deg);
  }`;

const lockWiggle = keyframes`
 0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(-25px);
  }
  50% {
    transform: translateX(25px);
  }
  75% {
    transform: translateX(-25px);
  }
  100% {
    transform: translateX(0px);
  }
`;

const AnimatedLockIcon = styled(LockIcon)`
  transform: rotateY(-90deg);
  transform-style: preserve-3d;
  animation: ${lockRotation} 1s ease-in-out forwards, ${lockWiggle} 0.25s 1.25s ease-in-out;
`;

export interface AccessDeniedModalProps {
  title: string;
  message?: string;
  actionElement: EmotionJSX.Element;
}

export const AccessDenied = ({ title, message, actionElement }: AccessDeniedModalProps) => {
  const iconSize = useIconSize();

  return (
    <Container>
      <ModalCard title={title} mainContainerStyle={mainContainerStyle}>
        <AnimatedLockIcon size={iconSize} />
        {message && <Message>{message}</Message>}
        {actionElement}
      </ModalCard>
    </Container>
  );
};
