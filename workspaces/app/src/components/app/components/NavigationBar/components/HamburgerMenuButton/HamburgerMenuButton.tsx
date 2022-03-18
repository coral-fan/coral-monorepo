import { getIconComponent } from 'components/ui/icons/utils';
import hamburgerIconSVG from './hamburger.svg';
import { BaseButton } from 'components/ui/buttons/BaseButton';
import styled from '@emotion/styled';
import { DESKTOP_BREAKPOINT } from 'styles';
import tokens from 'styles/tokens';

const HamburgerIcon = getIconComponent('HamburgerIcon', hamburgerIconSVG);

const MenuButton = styled(BaseButton)`
  width: ${tokens.buttons.size.mobile};
  height: ${tokens.buttons.size.mobile};

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    width: ${tokens.buttons.size.desktop};
    height: ${tokens.buttons.size.desktop};
  }
`;

export const HamburgerMenuButton = ({ ...props }) => (
  <MenuButton {...props}>
    <HamburgerIcon />
  </MenuButton>
);
