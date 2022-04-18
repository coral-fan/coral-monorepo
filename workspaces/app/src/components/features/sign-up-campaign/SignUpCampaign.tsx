import styled from '@emotion/styled';
import { useIsAuthenticated } from 'libraries/authentication';
import { SignUp, ThanksForSigningUp } from './components';

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

export const SignUpCampaign = () => {
  const isAuthenticated = useIsAuthenticated();

  return <Container>{isAuthenticated ? <ThanksForSigningUp /> : <SignUp />}</Container>;
};
