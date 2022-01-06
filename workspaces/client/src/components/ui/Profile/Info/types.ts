import { FlexProps } from 'components/layout';
import { userInfoSizeDictionary } from './consts';

type Size = keyof typeof userInfoSizeDictionary;

export interface InfoContainerProps extends FlexProps {
  size: Size;
}

export interface NameWrapperProps {
  size: Size;
}

export interface InfoProps {
  name: string;
  username: string;
  src: string;
  size: Size;
}
