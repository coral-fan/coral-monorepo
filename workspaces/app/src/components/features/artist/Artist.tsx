import styled from '@emotion/styled';
import { Artist } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { IMAGE_WITH_INFO_DEFAULT_ARGS } from 'components/ui/nft/components/ImageWithInfo/consts';

const Container = styled.div`
  display: flex;
`;

interface ArtistPageProps {
  artistData: Artist;
}

export const ArtistPage = ({ artistData }: ArtistPageProps) => {
  return <Container>{`${artistData.name}`}</Container>;
};

export const getServerSideProps: GetServerSideProps<ArtistPageProps, { artistId: string }> = async (
  context
) => {
  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { artistId } = params;

  // Make database call with artistId to get artistData.
  const artistData: Artist = {
    id: '1',
    name: 'Bonobo',
    profilePhoto: {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      offsetPercentages: [0, 0],
      scale: 1,
    },
    socialMedia: {
      twitter: null,
      facebook: null,
      instagram: null,
    },
    collections: [
      {
        id: '1',
        name: 'Behind the Scenes Studio Tour',
        gatedContent: {
          type: 'url',
          url: '/',
        },
        maxMintable: 5000,
        type: 'music',
        price: 1000,
        dropDate: '2022-04-01',
        description: 'Bonobo Collection',
        details: null,
        ...IMAGE_WITH_INFO_DEFAULT_ARGS,
      },
    ],
  };

  return {
    props: {
      artistData,
    },
  };
};
