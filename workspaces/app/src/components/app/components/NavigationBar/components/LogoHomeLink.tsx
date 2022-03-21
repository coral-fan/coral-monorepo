import { LogoIcon, Link } from 'components/ui';
import { getNavigationButtonStyle } from 'components/ui/buttons/utils';

export const LogoHomeLink = () => (
  <Link css={getNavigationButtonStyle({ transparent: true })} href="/">
    <LogoIcon />
  </Link>
);
