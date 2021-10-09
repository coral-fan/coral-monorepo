import { FC, useRef } from 'react';
import ReactDOM from 'react-dom';

import styled from '@emotion/styled';

/* Using FC because it always implies children.
   Prefer to define a props interface if children isn't a prop.
*/
export const Modal: FC = ({ children }) => {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);

  return ReactDOM.createPortal(<div></div>, document.body);
};
