import styled from '@emotion/styled';
import { toNestError } from '@hookform/resolvers';
import tokens from 'styles/tokens';

type Variant = 'primary' | 'secondary' | 'contrast';
interface CardProps {
  variant?: Variant;
}

const backgroundColorMap: Record<Variant, string> = {
  primary: tokens.background.color.secondary,
  secondary: tokens.background.color.tertiary,
  contrast: tokens.background.color.contrast,
};

export const Card = styled.div<CardProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  background-color: ${({ variant }) => backgroundColorMap[variant ?? 'primary']};
  border-radius: ${tokens.border.radius.lg};
`;
