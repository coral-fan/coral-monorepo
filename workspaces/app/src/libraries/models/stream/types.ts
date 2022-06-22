import { Artist, ArtistData } from '../artist';
import { Collection } from '../collection';

export interface StreamData {
  // sprout media id
  sproutMediaId: string;
  // chatango id
  chatId: string | null;
  name: string;
  date: string;
  description: string;
  artistId: Artist['id'];
  accessGrantingTokenAddresses: Collection['id'][];
  exclusiveCollectionIds: Collection['id'][] | null;
}

export interface Stream extends Omit<StreamData, 'exclusiveCollectionIds'> {
  id: string;
  artistName: ArtistData['name'];
  artistProfilePhoto: ArtistData['profilePhoto'];
  artistSocialHandles: ArtistData['socialHandles'];
  exclusiveCollections: Collection[] | null;
}
