import { Icon } from 'components/ui';
import { IconProps } from '../types';
import closeIconSVG from './closeIcon.svg';

export type CloseIconProps = Omit<IconProps, 'svg'>;

export const CloseIcon = ({ size, alt }: CloseIconProps) => {
  return <Icon svg={closeIconSVG} alt={alt} size={size} />;
};
