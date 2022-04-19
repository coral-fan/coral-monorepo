/* eslint-disable @next/next/no-img-element */
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import tokens from 'styles/tokens';

export interface BadgeProps {
  svg: string;
  children: ReactNode;
}

const Container = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 9px;
`;

const Wrapper = styled.div`
  color: ${tokens.font.color.brand};
  font-size: ${tokens.font.size.xs};
  line-height: ${tokens.font.line_height.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
  font-weight: ${tokens.font.weight.normal};
  text-transform: uppercase;
`;

export const BaseBadge = ({ svg, children }: BadgeProps) => {
  return (
    <Container>
      <img src={svg} width={'auto'} height={'auto'} alt={''} />
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};
