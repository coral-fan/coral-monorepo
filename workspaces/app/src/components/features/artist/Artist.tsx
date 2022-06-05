import { Artist, Collection, getArtist, getCollection } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { ArtistProfile } from './components/ArtistProfile';
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

  const { collectionIds, ...artist } = artistData;

  // TODO: Refactor Promise.allSettled with RxJs
  const collections = (await Promise.allSettled(collectionIds.map(getCollection)))
    .filter((result): result is PromiseFulfilledResult<Collection> => result.status === 'fulfilled')
    .map((result) => result.value);

  return {
    props: {
      id,
      ...artist,
      collections,
      assets: [],
    },
  };
};
