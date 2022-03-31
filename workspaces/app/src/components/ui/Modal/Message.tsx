import styled from '@emotion/styled';
import tokens, { QUERIES } from 'styles/tokens';

export const Message = styled.p`
  --font-size: ${tokens.font.size.md};
  @media ${QUERIES.laptopAndUp} {
    --font-size: ${tokens.font.size.lg};
  }
  font-size: var(--font-size);
`;
