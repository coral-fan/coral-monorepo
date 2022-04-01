import styled from '@emotion/styled';
import tokens, { QUERY } from 'styles/tokens';

export const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  background: ${tokens.background.color.brand};
  border-radius: ${tokens.border.radius.xxl};
  text-transform: uppercase;
  color: ${tokens.font.color.contrast};
  font-size: ${tokens.font.size.xs};
  line-height: ${tokens.font.line_height.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  padding: 8px;

  @media ${QUERY.LAPTOP} {
    font-size: ${tokens.font.size.sm};
    line-height: {$tokens.font.line_height.sm};
    letter-spacing: {$tokens.font.letter_spacing.sm};
    padding: 6px;
  }
`;
