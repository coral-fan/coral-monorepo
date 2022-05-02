import { Artist, Collection, getArtist, getCollection } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { ArtistProfile } from './components/ArtistProfile';
import { SERVER_ENVIRONMENT } from 'consts';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

type ArtistPageProps = Artist;

export const ArtistPage = (artistData: ArtistPageProps) => (
  <ArtistProfile artistData={artistData} />
);

interface ArtistParams extends NextParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<ArtistPageProps, ArtistParams> = async (
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
