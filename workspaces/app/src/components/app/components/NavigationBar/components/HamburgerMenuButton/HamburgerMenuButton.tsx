import { getIconComponent } from 'components/ui/icons/utils';
import hamburgerIconSVG from './hamburger.svg';
import { NavigationButton } from 'components/ui';

const HamburgerIcon = getIconComponent('HamburgerIcon', hamburgerIconSVG);

export const HamburgerMenuButton = ({ ...props }) => (
  <NavigationButton {...props}>
    <HamburgerIcon />
  </NavigationButton>
);
