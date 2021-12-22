import { Icon } from 'components/ui';
import { SingleIconProps } from '../types';
import leftArrowIcon from './leftArrowIcon.svg';

export const LeftArrowIcon = ({ size, alt }: SingleIconProps) => {
  return <Icon svg={leftArrowIcon} alt={alt} size={size} />;
};
