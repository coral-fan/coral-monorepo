import { Icon } from 'components/ui';
import { IconProps } from 'components/ui/Icon';
import leftArrowSVG from './leftArrow.svg';

export const LeftArrowIcon = ({ size, alt }: IconProps) => {
  return <Icon svg={leftArrowSVG} alt={alt} size={size} />;
};
