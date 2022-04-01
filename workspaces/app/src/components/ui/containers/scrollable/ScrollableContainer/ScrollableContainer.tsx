import styled from '@emotion/styled';
import tokens from 'styles/tokens';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  overflow: auto;
`;

const Items = styled.div`
  display: flex;
  gap: ${tokens.spacing.mobile.lg};
`;

interface ScrollableContainerProps<T> {
  children: Array<T>;
}

/*
Without the comma in <T,>, the linter thinks it's an HTML Element without a closing tag.
*/
export const ScrollableContainer = <T,>({ children }: ScrollableContainerProps<T>) => (
  <Container>
    <Items>{children}</Items>
  </Container>
);
