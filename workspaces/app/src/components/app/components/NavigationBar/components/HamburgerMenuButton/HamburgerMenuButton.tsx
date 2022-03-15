import { getIconComponent } from 'components/ui/icons/utils';
import hamburgerIconSVG from './hamburger.svg';
import { BaseButton } from 'components/ui/buttons/BaseButton';
import styled from '@emotion/styled';
import { DESKTOP_BREAKPOINT } from 'styles';

const HamburgerIcon = getIconComponent('HamburgerIcon', hamburgerIconSVG);

const MenuButton = styled(BaseButton)`
  width: 45px;
  height: 45px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    width: 60px;
    height: 60px;
  }
`;

export const HamburgerMenuButton = ({ ...props }) => (
  <MenuButton {...props}>
    <HamburgerIcon />
  </MenuButton>
);
