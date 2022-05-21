import { getDocumentData } from 'libraries/firebase';
import { EventData, Event } from './types';

export const getEvent = async (id: Event['id']) => await getDocumentData<EventData>('events', id);
