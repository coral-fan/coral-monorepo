import { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import tokens, { QUERY } from 'styles/tokens';
import { CloseButton, Content, Overlay } from './components';
import { ModalProps, ModalHasControlButton } from './types';
import { css } from '@emotion/react';

const { mobile, desktop } = tokens.layout.padding;

const ModalContainer = styled.div<ModalHasControlButton>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${tokens.layout.width.max};
  height: 100%;
  padding: ${mobile.vertical} ${mobile.horizontal};

  ${({ modalHasControlButton }) =>
    !modalHasControlButton &&
    css`
      padding-top: calc(${mobile.vertical} * 2 + ${tokens.buttons.size.mobile});
    `}

  gap: 18px;

  @media ${QUERY.LAPTOP} {
    gap: 24px;
    padding: ${desktop.vertical} ${desktop.horizontal};
  }
`;

const ModalControlContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  z-index: 2;
`;

export const Modal = ({
  children,
  title,
  subtitle,
  onClick,
  contentStyle,
  mainContainerStyle,
  mainContainerHasNoGap,
  variant,
  fullHeight,
  isNarrow,
}: ModalProps) => {
  const documentBodyRef = useRef<Document['body']>();

  const [isMounted, setIsMounted] = useState(false);

  const modalHasControlButton = useMemo(() => onClick !== undefined, [onClick]);

  useEffect(() => {
    documentBodyRef.current = document.body;
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const scrollY = window.scrollY;

    document.body.style.position = 'fixed';
    document.body.style.overflowY = 'hidden';
    document.body.style.width = '100vw';
    document.body.style.top = `-${scrollY}px`;

    return () => {
      document.body.style.position = '';
      document.body.style.overflowY = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  if (!isMounted) return null;

  return isMounted
    ? ReactDOM.createPortal(
        <Overlay>
          <ModalContainer modalHasControlButton={modalHasControlButton}>
            {onClick && (
              <ModalControlContainer>
                <CloseButton onClick={onClick} />
              </ModalControlContainer>
            )}
            <Content
              title={title}
              subtitle={subtitle}
              variant={variant}
              contentStyle={contentStyle}
              fullHeight={fullHeight}
              isNarrow={isNarrow}
              mainContainerStyle={mainContainerStyle}
              mainContainerHasNoGap={mainContainerHasNoGap}
              modalHasControlButton={modalHasControlButton}
            >
              {children}
            </Content>
          </ModalContainer>
        </Overlay>,
        document.body
      )
    : null;
};
