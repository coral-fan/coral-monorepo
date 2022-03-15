import styled from '@emotion/styled';
import { LogoIcon, Link as LinkComponent } from 'components/ui';
import { DESKTOP_BREAKPOINT } from 'styles';

const Link = styled(LinkComponent)`
  width: 45px;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    width: 60px;
  }
`;

export const LogoHomeLink = () => (
  <Link href="/">
    <LogoIcon />
  </Link>
);
