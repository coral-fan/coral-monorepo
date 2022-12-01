import styled from '@emotion/styled';
import tokens, { QUERY } from 'styles/tokens';

export const LargeHeader = styled.h3`
  --font-size: ${tokens.font.size.xl};
  font-size: var(--font-size);
  font-weight: ${tokens.font.weight.bold};
  line-height: var(--font-size);

  @media ${QUERY.TABLET} {
    --font-size: ${tokens.font.size.xxl};
  }
`;
