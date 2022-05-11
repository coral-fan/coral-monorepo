import styled from '@emotion/styled';
import { Key, ReactNode, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';

const TRANSITION_NAME = 'fade';

const FadeContainer = styled.div`
  &.${TRANSITION_NAME}-enter {
    opacity: 0;
  }
  &.${TRANSITION_NAME}-enter-active, &.${TRANSITION_NAME}-exit {
    opacity: 1;
    transition: opacity 500ms ease-in;
  }
  &.${TRANSITION_NAME}-exit-active {
    opacity: 0;
    transition: opacity 750ms ease-in-out;
    transition-delay: 100ms;
  }
`;

interface FadeAnimationProp {
  isAvailable: Key;
  children: ReactNode;
}

export const FadeOutInSwitchAnimation = ({ isAvailable, children }: FadeAnimationProp) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={isAvailable}
        nodeRef={nodeRef}
        addEndListener={(done: () => void) => {
          nodeRef.current?.addEventListener('transitionend', done, false);
        }}
        classNames={TRANSITION_NAME}
      >
        <FadeContainer ref={nodeRef}>{children}</FadeContainer>
      </CSSTransition>
    </SwitchTransition>
  );
};
