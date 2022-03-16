import { Photo, SocialHandles } from '../types';
import { Collection } from '../collection';
// id = coral wallet address
export interface Artist {
  // id = coral wallet address, not artist's personal wallet address
  id: string;
  name: string;
  profilePhoto: Photo;
  socialHandles: SocialHandles;

  collections: Collection[];
}
