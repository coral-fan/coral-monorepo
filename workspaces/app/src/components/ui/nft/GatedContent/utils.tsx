import { GatedContent } from 'libraries/models';
import { EventLink, ContentLink } from './components';

export const getGatedContentComponent = (gatedContent: GatedContent) => {
  if (gatedContent !== null) {
    switch (gatedContent.type) {
      case 'event':
        return <EventLink eventId={gatedContent.id} />;
      case 'url':
        return <ContentLink url={gatedContent.url} />;
    }
  }
  return null;
};
