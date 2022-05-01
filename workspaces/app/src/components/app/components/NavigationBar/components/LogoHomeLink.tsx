import { LogoIcon, Link } from 'components/ui';
import { getNavigationButtonStyle } from 'components/ui/buttons/variants/NavigationButton/utils';
import { getIconComponent } from 'components/ui/icons/utils';
import { CLIENT_ENVIRONMENT } from 'consts';
import logoWordmarkSVG from './logo-wordmark.svg';

const LogoWordmarkIcon = getIconComponent('LogoWordmarkIcon', logoWordmarkSVG);

export const LogoHomeLink = () => (
  <Link css={getNavigationButtonStyle(true)} href="/">
    {CLIENT_ENVIRONMENT === 'production' ? <LogoWordmarkIcon /> : <LogoIcon />}
  </Link>
);
