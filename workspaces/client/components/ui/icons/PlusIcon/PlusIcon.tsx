import { Icon } from 'components/ui';
import { SingleIconProps } from '../types';
import plusIcon from './plusIcon.svg';

export const PlusIcon = ({ size, alt }: SingleIconProps) => {
  return <Icon svg={plusIcon} alt={alt} size={size} />;
};
