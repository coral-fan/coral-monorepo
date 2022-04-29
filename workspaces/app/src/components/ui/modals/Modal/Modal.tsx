import { FC, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import tokens, { QUERY } from 'styles/tokens';
import { Heading, Card } from 'components/ui';
import { CloseButton, Overlay } from './components';
import { ModalProps } from './types';
import { css } from '@emotion/react';

const { mobile, desktop } = tokens.layout.padding;

interface ModalHasControlButton {
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

  gap: 24px;

  @media ${QUERY.LAPTOP} {
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

  @media ${QUERY.LAPTOP} {
    height: 100%;
    justify-content: center;
  }
`;

type ContentProps = Pick<ModalProps, 'title' | 'variant' | 'contentStyle' | 'fullHeight'> &
  ModalHasControlButton;

const Content = styled(Card)<ContentProps>`
  max-width: 575px;
  max-height: ${({ fullHeight }) => (fullHeight ? '100%' : '400px')};
  color: ${({ variant }) =>
    variant === 'contrast' ? tokens.font.color.contrast : tokens.font.color.primary};
  padding: ${({ title }) => `${title ? '20px' : '8px'} 18px`};
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.5);
  gap: 18px;
  overflow: scroll;

  @media ${QUERY.TABLET} {
    max-height: 750px;
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

/* 
  Using FC because it always implies children.
  Prefer to define a props interface if children isn't a prop.
*/
export const Modal: FC<ModalProps> = ({
  children,
  title,
  onClick,
  contentStyle,
  mainContainerStyle,
  mainContainerHasNoGap,
  variant,
  fullHeight,
}) => {
  const documentBodyRef = useRef<Document['body']>();

  const [isMounted, setIsMounted] = useState(false);

  const modalHasControlButton = useMemo(() => onClick !== undefined, [onClick]);

  useEffect(() => {
    documentBodyRef.current = document.body;
    setIsMounted(true);
  }, []);

  return isMounted
    ? ReactDOM.createPortal(
        <Overlay>
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
