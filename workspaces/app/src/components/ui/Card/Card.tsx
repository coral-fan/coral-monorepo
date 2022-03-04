import styled from '@emotion/styled';
import tokens from 'styles/tokens';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${tokens.background.color.secondary};
  border-radius: ${tokens.border.radius.lg};
  width: 100%;
`;
