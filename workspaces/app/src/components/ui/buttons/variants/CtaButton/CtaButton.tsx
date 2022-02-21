import styled from '@emotion/styled';
import { FC } from 'react';
import { BaseButton, BaseButtonProps as ButtonProps } from '../../BaseButton';
import rightArrowSvg from './rightArrow.svg';
import tokens from 'styles/tokens';
import { getIconComponent } from 'components/ui/icons/utils';

const ButtonWrapper = styled(BaseButton)`
  padding: 28px 20px;
  border-radius: ${tokens.border.radius.sm};
  background-color: ${tokens.background.color.brand};
  border: ${tokens.background.color.brand};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: ${tokens.font.size.lg};
  font-weight: ${tokens.font.weight.bold};
  line-height: ${tokens.font.line_height.lg};
  letter-spacing: ${tokens.font.letter_spacing.lg};
  color: ${tokens.font.color.contrast};
`;

const RightArrowIcon = getIconComponent('rightArrow', rightArrowSvg);

export const CtaButton: FC<ButtonProps> = ({ children, loading, ...props }) => {
  return (
    <ButtonWrapper loading={loading} {...props}>
      <Container>
        {children}
        <RightArrowIcon size={24} />
      </Container>
    </ButtonWrapper>
  );
};
