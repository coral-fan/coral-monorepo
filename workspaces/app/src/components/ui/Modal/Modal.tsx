import { FC, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';
import { Card } from '../Card';
import { CloseButton, Overlay } from './components';
import { ModalProps } from './types';
import { Heading } from 'components/ui';
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
  height: 100%;
  padding: ${mobile.vertical} ${mobile.horizontal};

  ${({ modalHasControlButton }) =>
    modalHasControlButton
      ? null
      : css`
          padding-top: calc(${mobile.vertical} * 2 + ${tokens.buttons.size.mobile});
        `}
  gap: 24px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
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

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    height: 100%;
    justify-content: center;
  }
`;

const Content = styled(Card)<Pick<ModalProps, 'title' | 'variant'> & ModalHasControlButton>`
  max-width: 575px;
  color: ${({ variant }) =>
    variant === 'contrast' ? tokens.font.color.contrast : tokens.font.color.primary};
  padding: ${({ title }) => `${title ? '16px' : '8px'} 18px`};
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.5);
  gap: 18px;
  max-height: 400px;
  overflow: scroll;

  ${({ modalHasControlButton }) =>
    modalHasControlButton
      ? null
      : css`
          margin-top: calc(
            ${tokens.layout.padding.mobile.vertical} + ${tokens.buttons.size.mobile}
          );
        `}

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    max-height: 750px;
  }
`;

const Main = styled.div<Pick<ModalProps, 'mainContainerStyle'>>`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  mainContainerStyle,
  variant,
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
              >
                {title && (
                  <Heading level={1} styleVariant={'h2'} colorVariant={variant}>
                    {title}
                  </Heading>
                )}
                <Main mainContainerStyle={mainContainerStyle}>{children}</Main>
              </Content>
            </ContentContainer>
          </ModalContainer>
        </Overlay>,
        document.body
      )
    : null;
};
