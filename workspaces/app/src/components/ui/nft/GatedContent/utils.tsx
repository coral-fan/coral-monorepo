import { GatedContent } from 'libraries/models';
import { StreamLink, ContentLink } from './components';

export const getGatedContentComponent = (gatedContent: GatedContent) => {
  if (gatedContent !== null) {
    switch (gatedContent.type) {
      case 'stream':
        return <StreamLink eventId={gatedContent.id} />;
      case 'url':
        return <ContentLink url={gatedContent.url} />;
    }
  }
  return null;
};
