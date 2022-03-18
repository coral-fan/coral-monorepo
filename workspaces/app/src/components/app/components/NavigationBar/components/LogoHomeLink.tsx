import styled from '@emotion/styled';
import { LogoIcon, Link as LinkComponent } from 'components/ui';
import { DESKTOP_BREAKPOINT } from 'styles';
import tokens from 'styles/tokens';

const Link = styled(LinkComponent)`
  width: ${tokens.buttons.size.mobile};
  height: ${tokens.buttons.size.mobile};

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    width: ${tokens.buttons.size.desktop};
    height: ${tokens.buttons.size.desktop};
  }
`;

export const LogoHomeLink = () => (
  <Link href="/">
    <LogoIcon />
  </Link>
);
