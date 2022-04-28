import styled from '@emotion/styled';
import { useIsAuthenticated } from 'libraries/authentication';
import { getDocumentData } from 'libraries/firebase';
import { GetServerSideProps } from 'next';
import { SignUp, ThanksForSigningUp } from './components';
import { PrelaunchSignUpCampaignData } from './types';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export interface SignUpCampaignProps {
  prelaunchSignUpUsers: PrelaunchSignUpCampaignData['users'];
}

export const SignUpCampaign = (props: SignUpCampaignProps) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Container>
      {isAuthenticated ? <ThanksForSigningUp {...props} /> : <SignUp {...props} />}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<SignUpCampaignProps> = async () => {
  const signUpCampaignData = await getDocumentData<PrelaunchSignUpCampaignData>(
    'app',
    'prelaunch-sign-up-campaign'
  );

  if (signUpCampaignData === undefined) {
    throw 'signUpCampaignData cannot be undefined.';
  }

  return {
    props: {
      prelaunchSignUpUsers: signUpCampaignData.users,
    },
  };
};
