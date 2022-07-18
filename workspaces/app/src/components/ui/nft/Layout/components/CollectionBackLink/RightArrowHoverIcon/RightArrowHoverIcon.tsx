import SVG, { Props as SVGProps } from 'react-inlinesvg';
import leftArrowIcon from 'components/ui/icons/LeftArrowIcon/left-arrow.svg';
import styled from '@emotion/styled';

const StyledSVG = styled(SVG)<SVGProps>`
  transform: rotate(180deg);
  width: 20px;
  height: 20px;
`;

export const RightArrowHoverIcon = () => <StyledSVG src={leftArrowIcon} title="RightArrowIcon" />;
