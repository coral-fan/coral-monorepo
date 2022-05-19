import { ArtistData } from '../artist';
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
  artistName: ArtistData['name'];
  artistProfilePhoto: ArtistData['profilePhoto'];
  artistSocialHandles: ArtistData['socialHandles'];
  exclusiveCollections: Collection[] | null;
}
