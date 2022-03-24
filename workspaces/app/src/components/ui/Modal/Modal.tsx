import { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';
import { Card } from '../Card';
import { CloseButton, Overlay } from './components';
import { ModalProps } from './types';
import { Heading } from 'components/ui';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 24px;
  gap: 24px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    padding: 40px 70px;
  }
`;

const ModalControlContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Content = styled(Card)<Pick<ModalProps, 'title' | 'variant'>>`
  max-width: 575px;
  color: ${({ variant }) =>
    variant === 'contrast' ? tokens.font.color.contrast : tokens.font.color.primary};
  padding: ${({ title }) => `${title ? '16px' : '8px'} 18px`};
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.5);
  gap: 18px;
  max-height: 400px;
  overflow: scroll;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    max-height: 750px;
  }
`;

const Main = styled.div<Pick<ModalProps, 'mainContainerStyle'>>`
  display: flex;
  flex-direction: column;
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

  useEffect(() => {
    documentBodyRef.current = document.body;
    setIsMounted(true);
  }, []);

  return isMounted
    ? ReactDOM.createPortal(
        <Overlay>
          <ModalContainer>
            {onClick && (
              <ModalControlContainer>
                <CloseButton onClick={onClick} />
              </ModalControlContainer>
            )}
            <Content title={title} variant={variant}>
              {title && (
                <Heading level={1} styleVariant={'h2'}>
                  {title}
                </Heading>
              )}
              <Main mainContainerStyle={mainContainerStyle}>{children}</Main>
            </Content>
          </ModalContainer>
        </Overlay>,
        document.body
      )
    : null;
};
