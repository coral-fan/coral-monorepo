import styled from '@emotion/styled';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';

export const Message = styled.p`
  --font-size: ${tokens.font.size.md};
  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    --font-size: ${tokens.font.size.lg};
  }
  font-size: var(--font-size);
`;
