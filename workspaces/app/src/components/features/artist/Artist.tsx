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
    bio: 'Simon Green, known by his stage name Bonobo, is a British musician, producer, and DJ based in Los Angeles. He debuted with a trip hop aesthetic, and has since explored more upbeat approaches as well as jazz and world music influences.',
    quote: null,
    profilePhoto: {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      offsetPercentages: [0, 0],
      scale: 1,
    },
    socialHandles: {
      facebook: null,
      twitter: null,
      instagram: null,
      tiktok: null,
      soundcloud: null,
      discogs: null,
      spotify: null,
    },
    assets: [],
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
