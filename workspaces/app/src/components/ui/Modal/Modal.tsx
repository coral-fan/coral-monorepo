import { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';
import { Card } from '../Card';
import { CloseButton, Overlay } from './components';
import { ModalProps } from './types';

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

const Content = styled(Card)<{ title?: string }>`
  max-width: 575px;
  color: ${tokens.font.color.primary};
  padding: ${({ title }) => `${title ? '16px' : '8px'} 18px`};
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.5);
`;

const Heading = styled.h1`
  font-weight: ${tokens.font.weight.bold};
  letter-spacing: 1px;
  font-size: ${tokens.font.size.xl};
  line-height: ${tokens.font.line_height.xl};
  padding-bottom: 24px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
`;

/* 
  Using FC because it always implies children.
  Prefer to define a props interface if children isn't a prop.
*/
export const Modal: FC<ModalProps> = ({ children, title, onClick }) => {
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
            <Content title={title}>
              {title && <Heading>{title}</Heading>}
              <Main>{children}</Main>
            </Content>
          </ModalContainer>
        </Overlay>,
        document.body
      )
    : null;
};
