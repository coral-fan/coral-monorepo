import styled from '@emotion/styled';
import tokens from 'styles/tokens';

export const ProfileItemWrapper = styled.div`
  min-width: 280px;
  flex: 0 0 48%;
`;

export const ItemsPlaceholder = styled.div`
  font-style: italic;
  font-size: ${tokens.font.size.md};
  letter-spacing: ${tokens.font.letter_spacing.md};
  line-height: ${tokens.font.line_height.md};
`;
