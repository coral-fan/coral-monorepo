import styled from '@emotion/styled';
import { useIsAuthenticated } from 'libraries/authentication';
import { getDocumentData, getDocumentReferenceServerSide } from 'libraries/firebase';
import { getUidServerSide } from 'libraries/models';
import { GetServerSideProps } from 'next';
import { SignUp, ThanksForSigningUp, PoweredByAvalanche } from './components';
import { EarlySignUpCampaignData } from './types';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const VideoBackground = styled.video`
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;
export interface SignUpCampaignProps {
  prelaunchSignUpUsers: EarlySignUpCampaignData['userUids'];
  isUserEarlySupporter: boolean;
}

export const SignUpCampaign = (props: SignUpCampaignProps) => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <VideoBackground autoPlay playsInline muted loop>
        <source src="/videos/background.webm" type="video/webm" />
        <source src="/videos/background.mp4" type="video/mp4" />
      </VideoBackground>
      <Container>
        {isAuthenticated ? <ThanksForSigningUp {...props} /> : <SignUp {...props} />}
        <PoweredByAvalanche />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SignUpCampaignProps> = async (ctx) => {
  let signUpCampaignData = await getDocumentData<EarlySignUpCampaignData>(
    'app',
    'early-sign-up-campaign'
  );

  if (!signUpCampaignData) {
    const signUpCampaignDocRef = await getDocumentReferenceServerSide(
      'app',
      'early-sign-up-campaign'
    );

    signUpCampaignData = { userUids: [] };
    signUpCampaignDocRef.set(signUpCampaignData);
  }

  const { userUids } = signUpCampaignData;

  const uid = await getUidServerSide(ctx);

  const isUserEarlySupporter = uid ? userUids.includes(uid) : false;

  return {
    props: {
      prelaunchSignUpUsers: userUids,
      isUserEarlySupporter,
    },
  };
};
