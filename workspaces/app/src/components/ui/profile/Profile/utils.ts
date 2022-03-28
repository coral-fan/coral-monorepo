import { Collection } from 'libraries/models';

export const sortCollectionByDropDateDesc = (arr: Collection[]) =>
  arr.sort((a, b) => new Date(a.dropDate).getTime() - new Date(b.dropDate).getTime());
