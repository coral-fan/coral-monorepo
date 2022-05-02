import styled from '@emotion/styled';
import { DropCard, Heading, ScrollableItemWrapper, ScrollableContainer } from 'components/ui';
import { getBadge } from 'components/ui/badges/utils';
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
  <>
    {similarCollections.length > 0 && (
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
                  isCard={true}
                />
              </ScrollableItemWrapper>
            );
          })}
        </ScrollableContainer>
      </Container>
    )}
  </>
);
