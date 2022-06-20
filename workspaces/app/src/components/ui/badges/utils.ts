import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { CollectionType } from 'libraries/models';
import {
  VideoBadge,
  MusicBadge,
  MerchBadge,
  StreamBadge,
  TicketBadge,
  AllAccessBadge,
} from './variants';

type BadgesType = Record<CollectionType, () => EmotionJSX.Element>;

const badgeDictionary: BadgesType = {
  video: VideoBadge,
  music: MusicBadge,
  merch: MerchBadge,
  stream: StreamBadge,
  // TODO: add all_access pass badge
  all_access: AllAccessBadge,
  ticket: TicketBadge,
};

export const getBadge = (type: CollectionType) => badgeDictionary[type];
