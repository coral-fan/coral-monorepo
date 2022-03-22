import styled from '@emotion/styled';
import { LinkButton } from 'components/ui';
import tokens, { DESKTOP_BREAKPOINT } from 'styles/tokens';

import { EditAvatarButton as EditAvatarButtonComponent } from '../EditAvatarButton';

const { size, line_height, letter_spacing, weight } = tokens.font;

export const EditAvatarButton = styled(EditAvatarButtonComponent)`
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: 0;

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    right: 15px;
  }
`;

export const EditProfileLinkButton = styled(LinkButton)`
  font-size: ${size.xs};
  letter-spacing: ${letter_spacing.xs};
  line-height: ${line_height.xs};
  font-weight: ${weight.bold};
  text-transform: uppercase;
  text-decoration: underline;
  padding: 4px 0px;
`;
