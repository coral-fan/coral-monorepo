import { getDocumentData } from 'libraries/firebase';
import { ArtistData } from './types';

export const getArtist = (id: ArtistData['id']) => getDocumentData<ArtistData>('artists', id);
