import { createElement, FC } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import { Flex } from 'components/layout';
import tokens from 'styles/tokens';
import { Card } from '../Card';
import { CloseButton, PreviousButton } from './buttons';
import { ModalProps } from './types';

const Overlay = styled(Flex)`
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  padding: 0 12px;
`;

const ModalContainer = styled(Card)`
  flex-direction: column;
  color: ${tokens.color.white};
  padding: 8px 18px;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.5);
`;

const Heading = styled.h1`
  font-weight: bold;
  font-size: 18px;
  line-height: 23px;
  border-bottom: 0.2px solid #9d9d9d;
  padding: 8px 0;
`;

const Main: FC = ({ children }) => <Flex direction={'column'}>{children}</Flex>;

/* 
  Using FC because it always implies children.
  Prefer to define a props interface if children isn't a prop.
*/
export const Modal: FC<ModalProps> = ({ children, title, onClick, variant }) =>
  typeof window === 'undefined'
    ? null
    : ReactDOM.createPortal(
        <Overlay>
          {onClick && createElement(variant === 'close' ? CloseButton : PreviousButton)}
          <ModalContainer>
            {title && <Heading>{title}</Heading>}
            <Main>{children}</Main>
          </ModalContainer>
        </Overlay>,
        document.body
      );
