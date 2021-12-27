import { Icon } from 'components/ui';
import { SingleIconProps } from '../../Icon/types';
import closeIconSVG from './closeIcon.svg';

export const CloseIcon = ({ size, alt }: SingleIconProps) => {
  return <Icon svg={closeIconSVG} alt={alt} size={size} />;
};
