import { Icon } from 'components/ui';
import { SingleIconProps } from '../types';
import plusSignIconSVG from './plusSignIconSVG.svg';

export const PlusSignIcon = ({ size, alt }: SingleIconProps) => {
  return <Icon svg={plusSignIconSVG} alt={alt} size={size} />;
};
