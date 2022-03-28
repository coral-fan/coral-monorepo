import styled from '@emotion/styled';
import { Footer, NavigationBar } from 'components/app/components';
import { FC } from 'react';
import { DESKTOP_BREAKPOINT } from 'styles';
import tokens from 'styles/tokens';

const { mobile, desktop } = tokens.layout.padding;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1540px;
  margin: auto;
  flex: 1;
  --padding: 0 ${mobile.horizontal};
  --padding-bottom: ${mobile.vertical};
  /* border: solid 1px green; */

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    --padding: 0 ${desktop.horizontal};
    --padding-bottom: ${desktop.vertical};
  }
  padding: var(--padding);
  padding-bottom: var(--padding-bottom);
`;

export const Layout: FC = ({ children }) => (
  <Container>
    <NavigationBar />
    <Main>{children}</Main>
    <Footer />
  </Container>
);
