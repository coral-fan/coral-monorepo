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
      const { name, type, dropDate } = collection;
      const badge = getBadge(type);
      return (
        <ProfileItemWrapper key={name}>
          <DropCard
            title={name}
            Badge={badge}
            dropDateTimestamp={dropDate}
            {...collection}
            description={''}
          />
        </ProfileItemWrapper>
      );
    })}
  </ProfileItems>
);
