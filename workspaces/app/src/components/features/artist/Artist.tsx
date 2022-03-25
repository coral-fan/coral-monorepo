import { Artist } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { IMAGE_WITH_INFO_DEFAULT_ARGS } from 'components/ui/nft/components/ImageWithInfo/consts';
import { ArtistProfile } from './components/ArtistProfile';

interface ArtistPageProps {
  artistData: Artist;
}

export const ArtistPage = ({ artistData }: ArtistPageProps) => {
  return (
    <>
      <ArtistProfile artistData={artistData} />
    </>
  );
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
    quote:
      'I’m beyond honored to have you all as my fans and I can’t wait to show you how I create this music',
    profilePhoto: {
      src: 'https://www.stereofox.com/images/86513/resized.jpg',
      offsetPercentages: [0, 0],
      scale: 1,
    },
    socialHandles: {
      facebook: 'bonoboofficial',
      twitter: 'si_bonobo',
      instagram: 'si_bonobo',
      tiktok: null,
      soundcloud: 'bonobo',
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
        dropDate: '2023-09-01',
        description:
          'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
        details: null,
        ...IMAGE_WITH_INFO_DEFAULT_ARGS,
      },
      {
        id: '2',
        name: 'Access Tour: This is an Extra Long Title',
        gatedContent: {
          type: 'url',
          url: '/',
        },
        maxMintable: 5000,
        type: 'music',
        price: 1000,
        dropDate: '2022-04-01',
        description:
          'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
        details: null,
        ...IMAGE_WITH_INFO_DEFAULT_ARGS,
      },
      {
        id: '3',
        name: 'This Is An Event',
        gatedContent: {
          type: 'url',
          url: '/',
        },
        maxMintable: 5000,
        type: 'event',
        price: 1000,
        dropDate: '2022-04-01',
        description:
          'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
        details: null,
        ...IMAGE_WITH_INFO_DEFAULT_ARGS,
      },
      {
        id: '3',
        name: 'MERCH',
        gatedContent: {
          type: 'url',
          url: '/',
        },
        maxMintable: 5000,
        type: 'merch',
        price: 1000,
        dropDate: '2022-03-01',
        description:
          'Exclusive access to a one on one call with me between recording sessions on my next album. With this token you’ll get 30 minutes of solo time with me and the band.',
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
