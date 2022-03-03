import styled from '@emotion/styled';
import { Collection } from 'libraries/models';
import { GetServerSideProps } from 'next';

const Container = styled.div`
  display: flex;
`;

interface CollectionPageProps {
  collectionData: Collection;
}

export const CollectionPage = ({ collectionData }: CollectionPageProps) => {
  return <Container>{`Collection ${collectionData.id}`}</Container>;
};

export const getServerSideProps: GetServerSideProps<
  CollectionPageProps,
  { collectionId: string }
> = async (context) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { collectionId } = params;

  // Make database call with collectionId to get collectionData.
  const collectionData: Collection = {
    id: '1',
    artistId: 'Bonobo',
    imageUrl: 'https://www.stereofox.com/images/86513/resized.jpg',
    maxMintable: 5000,
    type: 'music',
    price: 1000,
    dropDate: '2022-04-01',
    description: 'Bonobo Collection',
    details: null,
  };

  return {
    props: {
      collectionData,
    },
  };
};
