import styled from '@emotion/styled';
import coralPlusSVG from './coralPlus.svg';
import { getIconComponent } from 'components/ui/icons/utils';
import tokens from 'styles/tokens';
import { ReactNode } from 'react';

const Container = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 12px 9px 12px 0px;
  border-top: solid 1px ${tokens.border.color.secondary};
  gap: 100px;
`;

const Content = styled.p`
  font-size: ${tokens.font.size.sm};
  line-height: ${tokens.font.line_height.sm};
  letter-spacing: ${tokens.font.letter_spacing.sm};
  color: ${tokens.font.color.primary};
  font-weight: ${tokens.font.weight.normal};
`;

const Icon = getIconComponent('CoralPlus', coralPlusSVG);

interface DetailProps {
  children: ReactNode;
}

export const Detail = ({ children }: DetailProps) => (
  <Container>
    <Icon />
    <Content>{children}</Content>
  </Container>
);
