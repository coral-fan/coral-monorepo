import { DocumentReference } from 'firebase/firestore';
import { Artist, ArtistData } from '../artist';
import { CollectionData } from '../collection';

export interface EventData {
  id: string;
  // sprout media id
  streamId: string;
  // chatango id
  chatId: string;
  name: string;
  date: string;
  description: string;
  artist: DocumentReference<ArtistData>;
  allowedCollections: CollectionData['id'][];
  exclusiveCollections: CollectionData['id'][] | null;
}

export interface Event extends Omit<EventData, 'artistId' | 'allowedCollections'> {
  artistName: Artist['name'];
  artistProfilePhoto: Artist['profilePhoto'];
  artistSocialHandles: Artist['socialHandles'];
  allowedCollections: Set<CollectionData['id']>;
}
