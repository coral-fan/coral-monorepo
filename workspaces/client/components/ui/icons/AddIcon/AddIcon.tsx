import { Icon } from 'components/ui';
import { IconProps } from '../Icon/types';
import addIconSVG from './addIconSVG.svg';

export type AddIconProps = Omit<IconProps, 'svg'>;

export const AddIcon = ({ size, alt }: AddIconProps) => {
  return <Icon svg={addIconSVG} alt={alt} size={size} />;
};
