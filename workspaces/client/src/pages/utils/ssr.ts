import { getDocumentData } from 'libraries/firebase';
import { GetServerSideProps } from 'next';

export const getServerSidePropsFactory =
  (path: string, collection: string): GetServerSideProps =>
  async ({ params }) => {
    if (params === undefined) {
      return {
        notFound: true,
      };
    }

    const id = params[path];

    if (typeof id !== 'string') {
      return {
        notFound: true,
      };
    }

    const data = await getDocumentData(collection, id);

    if (data === undefined) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        user: data,
      },
    };
  };
