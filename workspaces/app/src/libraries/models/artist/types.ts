import { NullableString, Photo, SocialHandles } from '../types';
import { Collection } from '../collection';
import { Asset } from '..';

export interface ArtistData {
  // id = coral wallet address, not artist's personal wallet address
  name: string;
  bio: string;
  quote: NullableString;
  profilePhoto: Photo;
  socialHandles: SocialHandles;
  collections: Collection['id'][];
  assets: Asset['id'][];
}
// id = coral wallet address
export interface Artist extends Omit<ArtistData, 'collections' | 'assets'> {
  id: string;
  collections: Collection[];
  assets: Asset[];
}
