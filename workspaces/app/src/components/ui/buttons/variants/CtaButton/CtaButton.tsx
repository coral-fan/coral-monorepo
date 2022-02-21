import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC } from 'react';
import { BaseButton, BaseButtonProps as ButtonProps } from 'components/ui';
import rightArrowSvg from './rightArrow.svg';
import tokens from 'styles/tokens';
import { getIconComponent } from 'components/ui/icons/utils';

const ButtonStyle = css`
  padding: 28px 20px;
  border-radius: ${tokens.border.radius.sm};
  background-color: ${tokens.background.color.brand};
  border: ${tokens.background.color.brand};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: ${tokens.font.size.lg};
  line-height: ${tokens.font.line_height.lg};
  letter-spacing: ${tokens.font.letter_spacing.lg};
  color: ${tokens.font.color.button};
`;

export const CtaButton: FC<ButtonProps> = ({ children, loading, ...props }) => {
  const RightArrowIcon = getIconComponent('rightArrow', rightArrowSvg);
  return (
    <BaseButton css={ButtonStyle} loading={loading} {...props}>
      <Wrapper>
        {children}
        <RightArrowIcon size={24} />
      </Wrapper>
    </BaseButton>
  );
};
