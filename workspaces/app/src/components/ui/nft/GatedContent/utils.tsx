import { GatedContent } from 'libraries/models';
import { StreamLink, ContentLink } from './components';

export const getGatedContentComponent = (gatedContent: GatedContent) => {
  if (gatedContent !== null) {
    switch (gatedContent.type) {
      case 'stream':
        return <StreamLink value={gatedContent.value} />;
      case 'url':
        return <ContentLink value={gatedContent.value} />;
    }
  }
  return null;
};
