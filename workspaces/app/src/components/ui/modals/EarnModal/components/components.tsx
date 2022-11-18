import styled from '@emotion/styled';
import tokens from 'styles/tokens';

export const PrimaryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 10px;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.mobile.md};
`;

export const Heading = styled.h1`
  font-size: ${tokens.font.size.xl};
  letter-spacing: ${tokens.font.letter_spacing.xl};
  line-height: ${tokens.font.line_height.xl};
`;
