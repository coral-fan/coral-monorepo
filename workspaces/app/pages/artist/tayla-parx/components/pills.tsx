import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link, LinkProps } from 'components/ui';
import { BaseButton, BaseButtonProps } from 'components/ui/buttons/BaseButton';
import tokens from 'styles/tokens';

const basePillStyle = css`
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 1px;
  padding: 7px 11px;
  text-transform: uppercase;
  font-weight: ${tokens.font.weight.bold};
  width: fit-content;
  border-radius: 30px;
`;

export const primaryPillStyle = css`
  ${basePillStyle}
  background-color:  ${tokens.background.color.brand};
  color: ${tokens.font.color.contrast};
`;

interface ShareAndEarnProps extends Omit<BaseButtonProps, 'children'> {
  points?: number;
}

export const PillButton = styled(BaseButton)`
  ${primaryPillStyle}
  width: 170px;
`;

const isPlural = (num = 0) => num > 1;

export const ShareAndEarnButton = ({ points, ...props }: ShareAndEarnProps) => {
  return (
    <PillButton {...props} loading={!points} spinnerSize={'14px'}>{`Share & Earn ${points} Pt${
      isPlural(points) ? 's' : ''
    }`}</PillButton>
  );
};

export const linkHoverStyle = css`
  &:hover {
    background-color: ${tokens.background.color.contrast};
    color: ${tokens.font.color.contrast};
  }
`;

const secondaryPillStyle = css`
  ${basePillStyle}
  background-color: ${tokens.background.color.secondary};
  color: ${tokens.font.color.primary};

  ${linkHoverStyle}
`;

export const ViewLink = (props: LinkProps) => (
  <Link css={secondaryPillStyle} {...props}>
    View
  </Link>
);

export const PillLink = styled(Link)`
  ${primaryPillStyle}
  ${linkHoverStyle}
`;
