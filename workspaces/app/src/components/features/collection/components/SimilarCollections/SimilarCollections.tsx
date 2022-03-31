import styled from '@emotion/styled';
import { DropCard, Heading, ScrollableItemWrapper } from 'components/ui';
import { getBadge } from 'components/ui/badges/utils';
import { ScrollableContainer } from 'components/ui';
import { Collection } from 'libraries/models';
import tokens from 'styles/tokens';

export type PartialCollection = Omit<
  Collection,
  'gatedContent' | 'price' | 'details' | 'description'
>;

export interface SimilarCollectionsProp {
  similarCollections: PartialCollection[];
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${tokens.spacing.mobile.lg};
  padding-top: ${tokens.spacing.mobile.xl};
`;

export const SimilarCollections = ({ similarCollections }: SimilarCollectionsProp) => (
  <Container>
    <Heading level={2} styleVariant={'h3'}>
      Similar Drops
    </Heading>
    <ScrollableContainer>
      {similarCollections.map((collection) => {
        const { name, type, dropDate } = collection;
        const Badge = getBadge(type);
        return (
          <ScrollableItemWrapper key={`${collection.artistName}-${name}-${dropDate}`}>
            <DropCard
              title={name}
              Badge={Badge}
              dropDateTimestamp={dropDate}
              {...collection}
              description={''}
              isCard={true}
            />
          </ScrollableItemWrapper>
        );
      })}
    </ScrollableContainer>
  </Container>
);
