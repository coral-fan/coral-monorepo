import { Icon } from 'components/ui';
import { IconProps } from 'components/ui/Icon';
import closeIconSVG from './closeIcon.svg';

export const CloseIcon = ({ size, alt }: IconProps) => {
  return <Icon svg={closeIconSVG} alt={alt} size={size} />;
};
