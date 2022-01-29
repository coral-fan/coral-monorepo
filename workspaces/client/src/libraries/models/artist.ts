import { Collection } from './collection';
import { NullableString } from './types';
export interface Artist {
  // id = coral wallet address, not artist's personal wallet address
  id: string;
  name: string;

  socialMedia: {
    twitter: NullableString;
    facebook: NullableString;
    instagram: NullableString;
  };

  collections: Collection[];
}
