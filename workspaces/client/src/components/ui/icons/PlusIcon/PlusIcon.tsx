import { Icon } from 'components/ui';
import { SingleIconProps } from 'components/ui/Icon';
import plusIconSVG from './plusIcon.svg';

export const PlusIcon = ({ size, alt }: SingleIconProps) => {
  return <Icon svg={plusIconSVG} alt={alt} size={size} />;
};
