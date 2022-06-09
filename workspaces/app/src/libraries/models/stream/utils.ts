import { getDocumentData } from 'libraries/firebase';
import { StreamData, Event } from './types';

export const getStreamData = async (id: Event['id']) =>
  await getDocumentData<StreamData>('streams', id);
