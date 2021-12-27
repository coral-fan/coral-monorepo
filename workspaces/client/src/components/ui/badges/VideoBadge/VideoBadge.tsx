import { Badge } from 'components/ui';
import videoSVG from './video.svg';
import { BadgeProps } from 'components/ui/Badge/types';

export const VideoBadge = ({ size, variant }: BadgeProps) => {
  return <Badge svg={videoSVG} size={size} variant={variant} />;
};
