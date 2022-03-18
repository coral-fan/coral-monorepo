import { Photo, SocialHandles } from '../types';
import { Collection } from '../collection';
import { Asset } from '..';
// id = coral wallet address
export interface Artist {
  // id = coral wallet address, not artist's personal wallet address
  id: string;
  name: string;
  bio: string;
  quote?: string;
  profilePhoto: Photo;
  socialHandles: SocialHandles;

  collections: Collection[];
  assets: Asset[];
}
