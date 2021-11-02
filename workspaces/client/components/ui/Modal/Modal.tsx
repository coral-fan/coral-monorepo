import { FC } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import { Button } from '..';
import { Center, Flex } from 'components/layout';

const Overlay = styled(Center)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

interface HeaderProps {
  title?: string;
  close?: () => void;
}

const Header: FC<HeaderProps> = ({ title, close }) => {
  return (
    <Flex justifyContent={'space-between'}>
      {title && <h1>{title}</h1>}
      {close && <Button onClick={close}>Close</Button>}
    </Flex>
  );
};

const Main: FC = ({ children }) => <Flex direction={'column'}>{children}</Flex>;

interface ModalProps {
  width?: string;
}

export /* Using FC because it always implies children.
   Prefer to define a props interface if children isn't a prop.
*/
const Modal: FC<HeaderProps & ModalProps> = ({ children, width = '50%', close, title }) => {
  return typeof window === 'undefined'
    ? null
    : ReactDOM.createPortal(
        <Overlay>
          <Flex width={width} direction={'column'}>
            {(title || close) && <Header {...{ title, close }} />}
            <Main>{children}</Main>
          </Flex>
        </Overlay>,
        document.body
      );
};
