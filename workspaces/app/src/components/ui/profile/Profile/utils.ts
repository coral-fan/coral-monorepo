import { DocumentDataWithId } from 'libraries/firebase';
import { CollectionData } from 'libraries/models';

export const sortCollectionByDropDateDesc = (arr: DocumentDataWithId<CollectionData>[]) =>
  arr.sort((a, b) => new Date(a.dropDate).getTime() - new Date(b.dropDate).getTime());
