import styled from '@emotion/styled';
import { FC } from 'react';
import { DESKTOP_BREAKPOINT } from 'styles';

/*
The inverse of the flex basis roughly corresponds to the number of items that
will be visible at a given breakpoint, e.g. 30% means ~3 items will be visible,
50% means ~2, etc. The actual number is further dependent on the gap between items
set in ScrollableContainer.
*/

const ItemWrapper = styled.div`
  min-width: 220px;
  flex: 0 0 80%;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    flex: 0 0 40%;
  }
`;

export const ScrollableItemWrapper: FC = ({ children }) => <ItemWrapper>{children}</ItemWrapper>;
