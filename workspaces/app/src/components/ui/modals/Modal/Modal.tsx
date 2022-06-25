import { useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import tokens, { QUERY } from 'styles/tokens';
import { Heading, Card } from 'components/ui';
import { CloseButton, Overlay } from './components';
import { ModalProps } from './types';
import { css } from '@emotion/react';

const { mobile, desktop } = tokens.layout.padding;

export interface ModalHasControlButton {
  modalHasControlButton: boolean;
}

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

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${QUERY.TABLET} {
    height: 100%;
    justify-content: center;
  }
`;

type ContentProps = Pick<
  ModalProps,
  'title' | 'variant' | 'contentStyle' | 'fullHeight' | 'isNarrow'
> &
  ModalHasControlButton;

const Content = styled(Card)<ContentProps>`
  max-width: ${({ isNarrow }) => (isNarrow ? '400px' : '575px')};
  max-height: ${({ fullHeight }) => (fullHeight ? '76vh' : '420px')};
  color: ${({ variant }) =>
    variant === 'contrast' ? tokens.font.color.contrast : tokens.font.color.primary};
  padding: ${({ title }) => `${title ? '20px' : '8px'} 18px`};
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.5);
  gap: 10px;
  overflow-y: auto;
  overflow-x: hidden;

  @media ${QUERY.TABLET} {
    gap: 18px;
    max-height: 750px;
    ${({ modalHasControlButton }) =>
      modalHasControlButton &&
      css`
        transform: translateY(calc(-1 * (${tokens.buttons.size.mobile} + 12px)));
      `}
  }

  ${({ contentStyle }) => contentStyle}
`;

const Main = styled.div<Pick<ModalProps, 'mainContainerHasNoGap' | 'mainContainerStyle'>>`
  display: flex;
  flex-direction: column;
  ${({ mainContainerHasNoGap }) =>
    mainContainerHasNoGap
      ? null
      : css`
          gap: 16px;
        `};
  ${({ mainContainerStyle }) => mainContainerStyle}
`;

export const Modal = ({
  children,
  title,
  onClick,
  contentStyle,
  mainContainerStyle,
  mainContainerHasNoGap,
  variant,
  fullHeight,
  isNarrow,
  noOverlayZIndex,
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
        <Overlay noOverlayZIndex={noOverlayZIndex}>
          <ModalContainer modalHasControlButton={modalHasControlButton}>
            {onClick && (
              <ModalControlContainer>
                <CloseButton onClick={onClick} />
              </ModalControlContainer>
            )}
            <ContentContainer>
              <Content
                title={title}
                variant={variant}
                modalHasControlButton={modalHasControlButton}
                contentStyle={contentStyle}
                fullHeight={fullHeight}
                isNarrow={isNarrow}
              >
                {title && (
                  <Heading level={1} styleVariant={'h2'} colorVariant={variant}>
                    {title}
                  </Heading>
                )}
                <Main
                  mainContainerStyle={mainContainerStyle}
                  mainContainerHasNoGap={mainContainerHasNoGap}
                >
                  {children}
                </Main>
              </Content>
            </ContentContainer>
          </ModalContainer>
        </Overlay>,
        document.body
      )
    : null;
};
