import { Badge } from 'components/ui';
import doorSVG from './door.svg';
import { BadgeProps } from 'components/ui/Badge/types';

export const DoorBadge = ({ size, variant }: BadgeProps) => {
  return <Badge svg={doorSVG} size={size} variant={variant} />;
};
