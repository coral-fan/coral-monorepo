import styled from '@emotion/styled';
import { DropCard, Heading } from 'components/ui';
import { getBadge } from 'components/ui/badges/utils';
import { Collection } from 'libraries/models';
import { useWindowDimensions } from 'libraries/window';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';

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

const CollectionsContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 16px;
`;

const OverflowContainer = styled.div`
  overflow: auto;
`;

const Cards = styled.div`
  display: flex;
  gap: 16px;
`;

const CardWrapper = styled.div`
  flex: 0 0 80%;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    flex: 0 0 48%;
  }
`;

export const SimilarCollections = ({ similarCollections }: SimilarCollectionsProp) => {
  const { width } = useWindowDimensions();
  console.log(width);
  return (
    <Container>
      <Heading level={2} styleVariant={'h3'}>
        Similar Drops
      </Heading>
      <CollectionsContainer>
        <OverflowContainer>
          <Cards>
            {similarCollections.map((collection) => {
              const { name, type, dropDate } = collection;
              const Badge = getBadge(type);
              return (
                <CardWrapper key={`${collection.artistName}-${name}-${dropDate}`}>
                  <DropCard
                    title={name}
                    Badge={Badge}
                    dropDateTimestamp={dropDate}
                    {...collection}
                    description={''}
                    isCard={true}
                  />
                </CardWrapper>
              );
            })}
          </Cards>
        </OverflowContainer>
      </CollectionsContainer>
    </Container>
  );
};
