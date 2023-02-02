import { getDocumentData } from 'libraries/firebase';
import { Artist, ArtistData } from './types';

export const getArtist = <T = undefined>(id: Artist<T>['id']) =>
  getDocumentData<ArtistData<T>>('artists', id);
