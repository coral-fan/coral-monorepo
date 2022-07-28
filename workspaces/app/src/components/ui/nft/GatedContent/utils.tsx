import { GatedContent } from 'libraries/models';
import { StreamLink, ContentLink } from './components';

export const getGatedContentComponent = (gatedContent: GatedContent) => {
  if (gatedContent !== null) {
    switch (gatedContent.type) {
      case 'stream':
        return <StreamLink type="stream" value={gatedContent.value} />;
      case 'url':
        return <ContentLink type="url" value={gatedContent.value} />;
    }
  }
  return null;
};
