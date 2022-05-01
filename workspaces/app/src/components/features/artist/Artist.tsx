import { Artist, Collection, getArtist, getCollection } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { ArtistProfile } from './components/ArtistProfile';
import { SERVER_ENVIRONMENT } from 'consts';

interface ArtistPageProps {
  artistData: Artist;
}

export const ArtistPage = ({ artistData }: ArtistPageProps) => (
  <ArtistProfile artistData={artistData} />
);

export const getServerSideProps: GetServerSideProps<ArtistPageProps, { artistId: string }> = async (
  context
) => {
  //  TODO: remove conditional return for sign up campaign
  if (SERVER_ENVIRONMENT === 'production') {
    return {
      notFound: true,
    };
  }

  const { params } = context;

  if (params === undefined) {
    return {
      notFound: true,
    };
  }

  const { id } = params;

  const artistData = await getArtist(id);

  if (!artistData) {
    return {
      notFound: true,
    };
  }

  const { collections, ...artist } = artistData;

  const artistCollections = (await Promise.allSettled(collections.map(getCollection)))
    .filter((result): result is PromiseFulfilledResult<Collection> => result.status === 'fulfilled')
    .map((result) => result.value);

  return {
    props: {
      ...artist,
      collections: artistCollections,
      assets: [],
    },
  };
};
