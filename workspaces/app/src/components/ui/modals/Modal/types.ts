import { SerializedStyles } from '@emotion/react';
import { Variant } from '../../Card';

export interface ModalProps {
  title?: string;
  mainContainerHasNoGap?: boolean;
  contentStyle?: SerializedStyles;
  mainContainerStyle?: SerializedStyles;
  fullHeight?: boolean;
  onClick?: () => void;
  variant?: Variant;
}
