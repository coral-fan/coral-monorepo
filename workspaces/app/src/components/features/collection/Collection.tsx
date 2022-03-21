import styled from '@emotion/styled';
import { Collection } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { IMAGE_WITH_INFO_DEFAULT_ARGS } from 'components/ui/nft/components/ImageWithInfo/consts';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

const Container = styled.div`
  display: flex;
`;

interface CollectionPageProps {
  collectionData: Collection;
}

export const CollectionPage = ({ collectionData }: CollectionPageProps) => {
  return <Container>{`Collection ${collectionData.id}`}</Container>;
};

interface CollectionParams extends NextParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<CollectionPageProps, CollectionParams> = async (
  context
) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { id } = params;

  // Make database call with collectionId to get collectionData.
  const collectionData: Collection = {
    id,
    name: 'Behind the Scenes Studio Tour',
    maxMintable: 5000,
    type: 'music',
    gatedContent: {
      type: 'url',
      url: '/',
    },
    price: 1000,
    dropDate: '2022-04-01',
    description:
      'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
    details: null,
    ...IMAGE_WITH_INFO_DEFAULT_ARGS,
  };
  return {
    props: {
      collectionData,
    },
  };
};
