import { NullableString } from '../types';
import { Collection } from '../collection';
import { Photo } from '../user';
// id = coral wallet address
export interface Artist {
  // id = coral wallet address, not artist's personal wallet address
  id: string;
  name: string;
  profilePhoto: Photo;
  socialMedia: {
    twitter: NullableString;
    facebook: NullableString;
    instagram: NullableString;
  };

  collections: Collection[];
}
