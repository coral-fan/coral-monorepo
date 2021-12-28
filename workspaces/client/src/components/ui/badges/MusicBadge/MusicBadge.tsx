import { Badge } from '../Badge';
import musicSVG from './music.svg';
import { BadgeProps } from 'components/ui/badges/types';

export const MusicBadge = ({ size, variant }: BadgeProps) => {
  return <Badge iconComponent="MusicIcon" svg={musicSVG} size={size} variant={variant} />;
};
