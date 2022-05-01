import { getDocumentData } from 'libraries/firebase';
import { EventData } from 'libraries/models';

export const getEvent = async (id: EventData['id']) =>
  await getDocumentData<EventData>('events', id);
