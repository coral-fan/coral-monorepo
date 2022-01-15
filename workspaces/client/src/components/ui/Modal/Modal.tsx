import { createElement, FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import tokens from 'styles/tokens';
import { Card } from '../Card';
import { CloseButton, PreviousButton } from './buttons';
import { ModalProps } from './types';

const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  padding: 0 12px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
  width: 100%;
  max-width: 366px;
`;

const Content = styled(Card)<{ title?: string }>`
  width: 100%;
  flex-direction: column;
  color: ${tokens.color.white};
  padding: ${({ title }) => `${title ? '16px' : '8px'} 18px`};
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.5);
`;

const Heading = styled.h1`
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  border-bottom: 0.2px solid #9d9d9d;
  padding-bottom: 8px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

/* 
  Using FC because it always implies children.
  Prefer to define a props interface if children isn't a prop.
*/
export const Modal: FC<ModalProps> = ({ children, title, onClick, variant }) => {
  const documentBodyRef = useRef<Document['body']>();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    documentBodyRef.current = document.body;
    setIsMounted(true);
  }, []);

  return isMounted
    ? ReactDOM.createPortal(
        <Overlay>
          <Container>
            {onClick && createElement(variant === 'close' ? CloseButton : PreviousButton)}
            <Content title={title}>
              {title && <Heading>{title}</Heading>}
              <Main>{children}</Main>
            </Content>
          </Container>
        </Overlay>,
        document.body
      )
    : null;
};
