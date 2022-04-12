import { Artist, ArtistData } from '../artist';
import { Collection, CollectionData } from '../collection';

export interface EventData {
  id: string;
  // sprout media id
  streamId: string;
  // chatango id
  chatId: string;
  name: string;
  date: string;
  description: string;
  artistId: ArtistData['id'];
  allowedCollectionIds: CollectionData['id'][];
  exclusiveCollectionIds: CollectionData['id'][] | null;
}

export interface Event extends Omit<EventData, 'exclusiveCollectionIds'> {
  artistName: Artist['name'];
  artistProfilePhoto: Artist['profilePhoto'];
  artistSocialHandles: Artist['socialHandles'];
  exclusiveCollections: Collection[] | null;
}
