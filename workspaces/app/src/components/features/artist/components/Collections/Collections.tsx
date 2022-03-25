import { getBadge } from 'components/ui/badges/utils';
import { DropCard } from 'components/ui';
import { Collection } from 'libraries/models';
import { sortCollectionByDropDateDesc } from 'components/ui/profile';
import { ProfileItems } from 'components/ui';
import { ProfileItemWrapper } from 'components/ui/profile';

interface CollectionProps {
  collections: Collection[];
}

export const Collections = ({ collections }: CollectionProps) => (
  <ProfileItems>
    {sortCollectionByDropDateDesc(collections).map((collection) => {
      const { name, artistName, artistProfilePhoto, imageUrl, type, id, dropDate } = collection;
      const badge = getBadge(type);
      return (
        <ProfileItemWrapper key={name}>
          <DropCard
            id={id}
            title={name}
            Badge={badge}
            imageUrl={imageUrl}
            artistName={artistName}
            artistProfilePhoto={artistProfilePhoto}
            dropDateTimestamp={dropDate}
          />
        </ProfileItemWrapper>
      );
    })}
  </ProfileItems>
);
