import { Icon } from 'components/ui';
import { IconProps } from '../types';
import closeIcon from './closeIcon.svg';

export type CloseIconProps = Omit<IconProps, 'svg'>;

export const CloseIcon = ({ size, alt }: CloseIconProps) => {
  return <Icon svg={closeIcon} alt={alt} size={size} />;
};
