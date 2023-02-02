import { NullableString, Photo, SocialHandles } from '../types';
import { Collection } from '../collection';

export type ArtistData<T = undefined> = {
  // id = coral wallet address, not artist's personal wallet address
  name: string;
  bio: string;
  quote: NullableString;
  profilePhoto: Photo;
  socialHandles: SocialHandles;
  collectionIds: Collection['id'][];
  tag?: string;
} & (T extends undefined
  ? // eslint-disable-next-line @typescript-eslint/ban-types
    {}
  : { metadata: T });
// id = coral wallet address
export type Artist<T = undefined> = Omit<ArtistData<T>, 'collectionIds'> & {
  id: string;
  collections: Collection[];
};
