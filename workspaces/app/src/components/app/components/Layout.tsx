import styled from '@emotion/styled';
import { Footer, NavigationBar } from 'components/app/components';
import { CLIENT_ENVIRONMENT } from 'consts';
import { FC } from 'react';
import { QUERY } from 'styles';
import tokens from 'styles/tokens';

const { mobile, desktop } = tokens.layout.padding;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MaxWidthContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${tokens.layout.width.max};
  margin: auto;
  flex: 1;

  --padding: 0 ${mobile.horizontal};
  --padding-bottom: ${mobile.vertical};

  @media ${QUERY.LAPTOP} {
    --padding: 0 ${desktop.horizontal};
    --padding-bottom: ${desktop.vertical};
  }
  padding: var(--padding);
  padding-bottom: var(--padding-bottom);
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Layout: FC = ({ children }) => (
  <Container>
    <MaxWidthContainer>
      <NavigationBar />
      <Main>{children}</Main>
    </MaxWidthContainer>
    {/* TODO: remove sign up campaign specific logic */}
    {CLIENT_ENVIRONMENT !== 'production' && <Footer />}
  </Container>
);
