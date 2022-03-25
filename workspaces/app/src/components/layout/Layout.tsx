import styled from '@emotion/styled';
import { Footer, NavigationBar } from 'components/app/components';
import { FC } from 'react';
import { DESKTOP_BREAKPOINT } from 'styles';
import tokens from 'styles/tokens';

const { mobile, desktop } = tokens.layoutPadding;

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
  padding: 0 ${mobile.horizontal};
  padding-bottom: ${mobile.vertical};
  flex: 1;
  /* border: solid 1px green; */

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    padding: 0 ${desktop.horizontal};
    padding-bottom: ${desktop.vertical};
  }
`;

export const Layout: FC = ({ children }) => (
  <Container>
    <NavigationBar />
    <Main>{children}</Main>
    <Footer />
  </Container>
);
