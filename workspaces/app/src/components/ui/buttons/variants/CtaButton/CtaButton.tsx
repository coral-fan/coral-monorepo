import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { BaseButton, BaseButtonProps as CtaButtonProps } from '../../BaseButton';
import rightArrowSVG from './right-arrow.svg';
import tokens from 'styles/tokens';
import { getIconComponent } from 'components/ui/icons/utils';
import { css } from '@emotion/react';

export const CtaWrapperStyle = css`
  border-radius: ${tokens.border.radius.sm};
  background-color: ${tokens.background.color.brand};
  border: ${tokens.background.color.brand};
`;

const Wrapper = styled(BaseButton)`
  ${CtaWrapperStyle}
  width:100%;
  padding: 28px 20px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: ${tokens.font.size.lg};
  font-weight: ${tokens.font.weight.bold};
  line-height: ${tokens.font.line_height.lg};
  letter-spacing: ${tokens.font.letter_spacing.lg};
  color: ${tokens.font.color.contrast};
`;

const RightArrowIcon = getIconComponent('rightArrow', rightArrowSVG);

interface CtaContentProps {
  children: ReactNode;
}
export const CtaContent = ({ children }: CtaContentProps) => (
  <Container>
    {children}
    <RightArrowIcon size={24} />
  </Container>
);

export const CtaButton = ({ children, loading, ...props }: CtaButtonProps) => {
  return (
    <Wrapper loading={loading} {...props}>
      <CtaContent>{children}</CtaContent>
    </Wrapper>
  );
};
