import { NullableString } from '..';
import { Collection } from '../collection';
import { User } from '../user';

export interface Artist extends User {
  // description: long format description for Artist Page
  description: string;
  // quote: pull quote for Artist Page
  quote: NullableString;
  collections: Collection[];
}
