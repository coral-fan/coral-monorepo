import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { QUERY } from 'styles';

/*
The inverse of the flex basis roughly corresponds to the number of items that
will be visible at a given breakpoint, e.g. 30% means ~3 items will be visible,
50% means ~2, etc. The actual number is further dependent on the gap between items
set in ScrollableContainer.
*/

const Wrapper = styled.div`
  min-width: 220px;
  max-width: 355px;

  flex: 0 0 80%;

  @media ${QUERY.TABLET} {
    flex: 0 0 60%;
  }

  @media ${QUERY.LAPTOP} {
    flex: 0 0 40%;
  }
`;

interface ScrollableItemWrapperProps {
  children: ReactNode;
}

export const ScrollableItemWrapper = ({ children }: ScrollableItemWrapperProps) => (
  <Wrapper>{children}</Wrapper>
);
