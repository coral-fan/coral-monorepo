import styled from '@emotion/styled';
import { Artist } from 'libraries/models';
import { GetServerSideProps } from 'next';

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
    imageUrl: 'https://www.stereofox.com/images/86513/resized.jpg',
    description:
      'Simon Green, known by his stage name Bonobo, is a British musician, producer, and DJ based in Los Angeles. He debuted with a trip hop aesthetic, and has since explored more upbeat approaches as well as jazz and world music influences.',
    quote:
      'I’m beyond honored to have you all as my fans and I can’t wait to show you how I create this music',
    socialMedia: {
      twitter: 'si_bonobo',
      facebook: 'bonoboofficial',
      instagram: 'si_bonobo',
    },
    collections: [
      {
        id: '1',
        artistId: 'Bonobo',
        imageUrl: 'https://www.stereofox.com/images/86513/resized.jpg',
        maxMintable: 5000,
        type: 'music',
        price: 1000,
        dropDate: '2022-04-01',
        description: 'Bonobo Collection',
        details: null,
      },
    ],
  };

  return {
    props: {
      artistData,
    },
  };
};
