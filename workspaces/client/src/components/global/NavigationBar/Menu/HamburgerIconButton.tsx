import { ComponentProps, createElement } from 'react';
import styled from '@emotion/styled';
import { getIconComponent } from 'components/ui/icons/utils';
import hamburgerWithRedDotIconSVG from './hamburger-with-red-dot.svg';
import hamburgerIconSVG from './hamburger.svg';

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

export type HamburgerIconButtonProps = ComponentProps<'button'> & HamburgerIconProp;

const ButtonWrapper = styled.button`
  background-color: none;
`;

export const HamburgerIconButton = ({ hasNotifications, ...props }: HamburgerIconButtonProps) => (
  <ButtonWrapper {...props}>
    <HamburgerIcon hasNotifications={hasNotifications} />
  </ButtonWrapper>
);
