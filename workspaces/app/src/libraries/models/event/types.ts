import { Artist } from '../artist';
import { CollectionData } from '../collection';

export interface EventData {
  id: string;
  streamId: string;
  chatId: string;
  name: string;
  date: string;
  description: string;
  artistId: Artist['id'];
  allowedCollections: CollectionData['id'][];
  exclusiveCollections: CollectionData['id'][] | null;
}

export interface Event extends Omit<EventData, 'artistId'> {
  artistName: Artist['name'];
  artistProfilePhoto: Artist['profilePhoto'];
  artistSocialHandles: Artist['socialHandles'];
}
