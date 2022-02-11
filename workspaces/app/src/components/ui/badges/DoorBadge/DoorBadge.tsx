import { Badge } from '../Badge';
import doorSVG from './door.svg';
import { BadgeProps } from 'components/ui/badges/types';

export const DoorBadge = ({ size, variant }: BadgeProps) => {
  return <Badge iconComponent="DoorIcon" svg={doorSVG} size={size} variant={variant} />;
};
