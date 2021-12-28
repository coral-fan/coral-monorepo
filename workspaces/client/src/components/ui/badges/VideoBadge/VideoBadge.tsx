import { Badge } from '../Badge';
import videoSVG from './video.svg';
import { BadgeProps } from 'components/ui/badges/types';

export const VideoBadge = ({ size, variant }: BadgeProps) => {
  return <Badge iconComponent="VideoIcon" svg={videoSVG} size={size} variant={variant} />;
};
