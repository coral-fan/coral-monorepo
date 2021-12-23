import { Collection } from './collection';
// id = coral wallet address
export interface Artist {
  // id = coral wallet address, not artist's personal wallet address
  id: string;
  name: string;

  socialMedia: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };

  collections: Collection[];
}
