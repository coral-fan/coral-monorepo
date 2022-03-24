import { SerializedStyles } from '@emotion/react';
import { Variant } from '../Card';

export interface ModalProps {
  title?: string;
  mainContainerStyle?: SerializedStyles;
  onClick?: () => void;
  variant?: Variant;
}
