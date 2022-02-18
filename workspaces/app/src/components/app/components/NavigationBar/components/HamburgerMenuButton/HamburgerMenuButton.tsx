import { ComponentProps, createElement } from 'react';
import { getIconComponent } from 'components/ui/icons/utils';
import hamburgerWithRedDotIconSVG from './hamburger-with-red-dot.svg';
import hamburgerIconSVG from './hamburger.svg';
import { buttonBaseStyle } from 'components/ui/buttons/styles';
import { css } from '@emotion/react';
const HamburgerWithRedDotIcon = getIconComponent(
  'HamburgerIconWithRedDot',
  hamburgerWithRedDotIconSVG
);
const HamburgerWithoutRedDotIcon = getIconComponent('HamburgerIcon', hamburgerIconSVG);

const ICON_BUTTON_SIZE = 24;
interface HamburgerIconProp {
  hasNotifications: boolean;
}
const HamburgerIcon = ({ hasNotifications }: HamburgerIconProp) =>
  createElement(
    hasNotifications ? HamburgerWithRedDotIcon : HamburgerWithoutRedDotIcon,
    { size: ICON_BUTTON_SIZE },
    null
  );

export type HamburgerMenuButtonProps = ComponentProps<'button'> & HamburgerIconProp;

const buttonStyle = css`
  ${buttonBaseStyle};
  background-color: transparent;
  justify-self: start;
`;

export const HamburgerMenuButton = ({ hasNotifications, ...props }: HamburgerMenuButtonProps) => (
  <button css={buttonStyle} {...props}>
    <HamburgerIcon hasNotifications={hasNotifications} />
  </button>
);
