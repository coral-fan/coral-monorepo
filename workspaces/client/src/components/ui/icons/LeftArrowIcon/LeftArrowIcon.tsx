import { Icon } from 'components/ui';
import { SingleIconProps } from 'components/ui/Icon';
import leftArrowSVG from './leftArrow.svg';

export const LeftArrowIcon = ({ size, alt }: SingleIconProps) => {
  return <Icon svg={leftArrowSVG} alt={alt} size={size} />;
};
