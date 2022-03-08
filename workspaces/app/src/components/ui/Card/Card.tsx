import styled from '@emotion/styled';
import tokens from 'styles/tokens';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background-color: ${tokens.background.color.secondary};
  border-radius: ${tokens.border.radius.lg};
`;
