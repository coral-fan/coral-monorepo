import { SERVER_ENVIRONMENT } from 'consts';

export { TermsOfServices as default } from 'components/features/legal';

export const getServerSideProps = async () => {
  //  TODO: remove conditional return for sign up campaign
  if (SERVER_ENVIRONMENT === 'production') {
    return {
      notFound: true,
    };
  }
};
