import { ComponentProps, createElement } from 'react';
import styled from '@emotion/styled';
import { getIconComponent } from 'components/ui/icons/utils';
import hamburgerWithRedDotIconSVG from './hamburger-with-red-dot.svg';
import hamburgerIconSVG from './hamburger.svg';
import { BUTTON_BASE_STYLE } from 'components/ui/buttons/consts';

const HamburgerWithRedDotIcon = getIconComponent(
  'HamburgerIconWithRedDot',
  hamburgerWithRedDotIconSVG
);
const HamburgerWithoutRedDotIcon = getIconComponent('HamburgerIcon', hamburgerIconSVG);

interface HamburgerIconProp {
  hasNotifications: boolean;
}
const HamburgerIcon = ({ hasNotifications }: HamburgerIconProp) =>
  createElement(
    hasNotifications ? HamburgerWithRedDotIcon : HamburgerWithoutRedDotIcon,
    { size: 48 },
    null
  );

export type HamburgerMenuButtonProps = ComponentProps<'button'> & HamburgerIconProp;

const ButtonWrapper = styled.button`
  ${BUTTON_BASE_STYLE};
  background-color: transparent;
`;

export const HamburgerMenuButton = ({ hasNotifications, ...props }: HamburgerMenuButtonProps) => (
  <ButtonWrapper {...props}>
    <HamburgerIcon hasNotifications={hasNotifications} />
  </ButtonWrapper>
);
