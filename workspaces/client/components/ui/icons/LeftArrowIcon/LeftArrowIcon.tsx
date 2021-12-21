import { Icon } from 'components/ui';
import { SingleIconProps } from '../types';
import LeftArrowIconSVG from './LeftArrowIconSVG.svg';

export const LeftArrowIcon = ({ size, alt }: SingleIconProps) => {
  return <Icon svg={LeftArrowIconSVG} alt={alt} size={size} />;
};
