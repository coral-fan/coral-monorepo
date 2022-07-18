import styled from '@emotion/styled';
import coralPlusSVG from './coral-plus.svg';
import { getIconComponent } from 'components/ui/icons/utils';
import tokens from 'styles/tokens';
import { ReactNode } from 'react';
import { useIsMobile } from 'libraries/window';

interface DetailsContainerProps {
  isMobile: boolean;
}

const Container = styled.div<DetailsContainerProps>`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 12px 9px 12px 0px;
  border-top: solid 1px ${tokens.border.color.secondary};
  gap: ${({ isMobile }) => (isMobile ? '60px' : '90px')};
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

export const Detail = ({ children }: DetailProps) => {
  const isMobile = useIsMobile();
  return (
    <Container isMobile={isMobile}>
      <Icon />
      <Content>{children}</Content>
    </Container>
  );
};
