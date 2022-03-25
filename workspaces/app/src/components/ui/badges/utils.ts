import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { Collection } from 'libraries/models';
import { VideoBadge, MusicBadge, MerchBadge, EventBadge } from './variants';

type BadgesType = Record<Collection['type'], () => EmotionJSX.Element>;

const badgeDictionary: BadgesType = {
  video: VideoBadge,
  music: MusicBadge,
  merch: MerchBadge,
  event: EventBadge,
};

export const getBadge = (type: Collection['type']) => badgeDictionary[type];
