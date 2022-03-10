import styled from '@emotion/styled';
import tokens from 'styles/tokens';

interface CardProps {
  variant?: 'primary' | 'secondary';
}
export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background-color: ${({ variant }) =>
    variant === 'secondary' ? tokens.background.color.tertiary : tokens.background.color.secondary};
  border-radius: ${tokens.border.radius.lg};
`;
