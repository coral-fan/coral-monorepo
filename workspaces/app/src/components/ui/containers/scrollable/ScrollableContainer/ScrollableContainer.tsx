import styled from '@emotion/styled';
import { ReactNode } from 'react';
import tokens from 'styles/tokens';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  overflow: auto;
  margin-right: -0.75%;
  /* mask: linear-gradient(
    270deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 10%,
    rgba(30, 30, 30, 1) 100%
  ); */
`;

const Items = styled.div`
  display: flex;
  gap: ${tokens.spacing.mobile.lg};
`;

interface ScrollableContainerProps {
  children: ReactNode[];
}

/*
Without the comma in <T,>, the linter thinks it's an HTML Element without a closing tag.
*/
export const ScrollableContainer = ({ children }: ScrollableContainerProps) => (
  <Container>
    <Items>{children}</Items>
  </Container>
);
