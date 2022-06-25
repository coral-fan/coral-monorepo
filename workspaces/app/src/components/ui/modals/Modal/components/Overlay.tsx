import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ModalProps } from '../types';

export const Overlay = styled.div<Pick<ModalProps, 'noOverlayZIndex'>>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  background: rgba(0, 0, 0, 0.5);

  ${({ noOverlayZIndex }) =>
    !noOverlayZIndex &&
    css`
      z-index: 1;
    `}
`;
