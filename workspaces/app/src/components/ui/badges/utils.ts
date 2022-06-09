import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { CollectionType } from 'libraries/models';
import { VideoBadge, MusicBadge, MerchBadge, StreamBadge } from './variants';
import { AllAccessBadge } from './variants/AllAccessBadge';

type BadgesType = Record<CollectionType, () => EmotionJSX.Element>;

const badgeDictionary: BadgesType = {
  video: VideoBadge,
  music: MusicBadge,
  merch: MerchBadge,
  stream: StreamBadge,
  // TODO: add all_access pass badfe
  all_access: AllAccessBadge,
};

export const getBadge = (type: CollectionType) => badgeDictionary[type];
