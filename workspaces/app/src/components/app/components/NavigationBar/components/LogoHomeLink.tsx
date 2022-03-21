import { LogoIcon, Link } from 'components/ui';
import { getNavigationButtonStyle } from 'components/ui/buttons/variants/NavigationButton/utils';

export const LogoHomeLink = () => (
  <Link css={getNavigationButtonStyle(true)} href="/">
    <LogoIcon />
  </Link>
);
