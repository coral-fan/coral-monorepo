import { Icon } from 'components/ui';
import { SingleIconProps } from 'components/ui/Icon';
import closeIconSVG from './closeIcon.svg';

export const CloseIcon = ({ size, alt }: SingleIconProps) => {
  return <Icon svg={closeIconSVG} alt={alt} size={size} />;
};
