import { Artist, ArtistData } from '../artist';
import { Collection } from '../collection';

export interface EventData {
  // sprout media id
  streamId: string;
  // chatango id
  chatId: string;
  name: string;
  date: string;
  description: string;
  artistId: Artist['id'];
  accessGrantingTokenAddresses: Collection['id'][];
  exclusiveCollectionIds: Collection['id'][] | null;
}

export interface Event extends Omit<EventData, 'exclusiveCollectionIds'> {
  id: string;
  artistName: ArtistData['name'];
  artistProfilePhoto: ArtistData['profilePhoto'];
  artistSocialHandles: ArtistData['socialHandles'];
  exclusiveCollections: Collection[] | null;
}
