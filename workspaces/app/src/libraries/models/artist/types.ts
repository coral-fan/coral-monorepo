import { NullableString, Photo, SocialHandles } from '../types';
import { Collection } from '../collection';

export interface ArtistData {
  // id = coral wallet address, not artist's personal wallet address
  name: string;
  bio: string;
  quote: NullableString;
  profilePhoto: Photo;
  socialHandles: SocialHandles;
  collectionIds: Collection['id'][];
  tag?: string;
}
// id = coral wallet address
export interface Artist extends Omit<ArtistData, 'collectionIds'> {
  id: string;
  collections: Collection[];
}
