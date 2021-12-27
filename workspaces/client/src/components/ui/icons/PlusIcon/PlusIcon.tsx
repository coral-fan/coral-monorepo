import { Icon } from 'components/ui';
import { IconProps } from 'components/ui/Icon';
import plusIconSVG from './plusIcon.svg';

export const PlusIcon = ({ size, alt }: IconProps) => {
  return <Icon svg={plusIconSVG} alt={alt} size={size} />;
};
