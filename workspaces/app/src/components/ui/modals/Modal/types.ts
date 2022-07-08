import { SerializedStyles } from '@emotion/react';
import { ReactNode } from 'react';
import { Variant } from '../../Card';

export interface ModalProps {
  children: ReactNode;
  title?: string;
  mainContainerHasNoGap?: boolean;
  contentStyle?: SerializedStyles;
  mainContainerStyle?: SerializedStyles;
  fullHeight?: boolean;
  onClick?: () => void;
  variant?: Variant;
  isNarrow?: boolean;
}

export interface ModalHasControlButton {
  modalHasControlButton: boolean;
}
