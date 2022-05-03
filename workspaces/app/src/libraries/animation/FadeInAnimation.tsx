import styled from '@emotion/styled';
import { FC, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

const TRANSITION_NAME = 'fade';
const ANIMATION_DURATION = 300;

const FadeContainer = styled.div`
  &.${TRANSITION_NAME}-enter {
    opacity: 0;
  }
  &.${TRANSITION_NAME}-enter-active {
    opacity: 1;
    transition: opacity ${ANIMATION_DURATION}ms ease-in;
  }
`;

interface FadeAnimationProp {
  isLoading: boolean;
}

export const FadeInAnimation: FC<FadeAnimationProp> = ({ isLoading, children }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      unmountOnExit
      in={!isLoading}
      timeout={ANIMATION_DURATION}
      classNames={TRANSITION_NAME}
      addEndListener={(done: () => void) => {
        nodeRef.current?.addEventListener('transitionend', done, false);
      }}
    >
      <FadeContainer ref={nodeRef}>{children}</FadeContainer>
    </CSSTransition>
  );
};
