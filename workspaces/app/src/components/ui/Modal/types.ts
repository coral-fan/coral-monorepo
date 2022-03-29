import { SerializedStyles } from '@emotion/react';
import { Variant } from '../Card';

export interface ModalProps {
  title?: string;
  mainContainerHasNoGap?: boolean;
  mainContainerStyle?: SerializedStyles;
  onClick?: () => void;
  variant?: Variant;
}
