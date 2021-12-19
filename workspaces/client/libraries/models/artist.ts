import { Collection } from './collection';

export interface Artist {
  id: string;
  name: string;

  socialMedia: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };

  collections: Collection[];
}
