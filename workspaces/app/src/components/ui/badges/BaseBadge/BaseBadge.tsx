/* eslint-disable @next/next/no-img-element */
import styled from '@emotion/styled';
import { FC } from 'react';
import tokens from 'styles/tokens';

export interface BadgeProps {
  svg: string;
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

export const BaseBadge: FC<BadgeProps> = ({ svg, children }) => {
  return (
    <Container>
      <img src={svg} width={19} height={12} alt={''} />
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};
