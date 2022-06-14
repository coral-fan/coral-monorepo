import { DocumentDataWithId } from 'libraries/firebase';
import { Collection, CollectionData } from 'libraries/models';

// TODO: hacked this together to fix typing errors using function overloading. revisit to see if this is the best approach
export function sortCollectionByDropDateDesc(arr: Collection[]): typeof arr;

export function sortCollectionByDropDateDesc(arr: DocumentDataWithId<CollectionData>[]): typeof arr;

export function sortCollectionByDropDateDesc(
  arr: Collection[] | DocumentDataWithId<CollectionData>[]
) {
  return arr.sort((a, b) => new Date(b.dropTime).getTime() - new Date(a.dropTime).getTime());
}
