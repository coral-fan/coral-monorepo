import { getDocumentData } from 'libraries/firebase';
import { StreamData, Stream } from './types';

export const getStreamData = async (id: Stream['id']) =>
  await getDocumentData<StreamData>('streams', id);
