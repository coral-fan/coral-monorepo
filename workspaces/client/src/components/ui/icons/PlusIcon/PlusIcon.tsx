import { Icon } from 'components/ui';
import { SingleIconProps } from '../types';
import plusIconSVG from './plusIcon.svg';

export const PlusIcon = ({ size, alt }: SingleIconProps) => {
  return <Icon svg={plusIconSVG} alt={alt} size={size} />;
};
