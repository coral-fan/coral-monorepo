import styled from '@emotion/styled';
import tokens, { QUERY } from 'styles/tokens';

export const Message = styled.p`
  --font-size: ${tokens.font.size.md};
  @media ${QUERY.LAPTOP} {
    --font-size: ${tokens.font.size.lg};
  }
  font-size: var(--font-size);
`;
