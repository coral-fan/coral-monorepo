import { getDocumentData } from 'libraries/firebase';
import { Artist, ArtistData } from './types';

export const getArtist = (id: Artist['id']) => getDocumentData<ArtistData>('artists', id);
