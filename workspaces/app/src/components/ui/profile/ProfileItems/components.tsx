import styled from '@emotion/styled';
import tokens, { QUERIES } from 'styles/tokens';

export const ProfileItemWrapper = styled.div`
  min-width: 220px;
  flex: 0 0 auto;

  @media ${QUERIES.tabletAndUp} {
    flex: 0 0 80%;
  }

  @media ${QUERIES.laptopAndUp} {
    flex: 0 0 48%;
  }
`;

export const ItemsPlaceholder = styled.div`
  font-style: italic;
  font-size: ${tokens.font.size.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  line-height: ${tokens.font.line_height.md};
`;
