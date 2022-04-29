import { SERVER_ENVIRONMENT } from 'consts';

export { TermsOfServices as default } from 'components/features/legal';

//  TODO: remove getServerSideProps sign up campaign
export const getServerSideProps = async () => {
  if (SERVER_ENVIRONMENT === 'production') {
    return {
      notFound: true,
    };
  }
};
