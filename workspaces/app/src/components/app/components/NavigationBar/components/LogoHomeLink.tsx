import styled from '@emotion/styled';
import { LogoIcon, Link as LinkComponent } from 'components/ui';
import { navigationButtonStyle } from 'components/ui/buttons/styles';

const Link = styled(LinkComponent)`
  ${navigationButtonStyle}
`;

export const LogoHomeLink = () => (
  <Link transparent={true} href="/">
    <LogoIcon />
  </Link>
);
