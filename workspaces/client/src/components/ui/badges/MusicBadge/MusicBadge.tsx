import { Badge } from 'components/ui';
import musicSVG from './music.svg';
import { BadgeProps } from 'components/ui/Badge/types';

export const MusicBadge = ({ size, variant }: BadgeProps) => {
  return <Badge svg={musicSVG} size={size} variant={variant} />;
};
