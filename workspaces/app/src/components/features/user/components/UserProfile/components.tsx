import styled from '@emotion/styled';
import { LinkButton } from 'components/ui';
import tokens, { QUERIES } from 'styles/tokens';

import { EditAvatarButton as BaseEditAvatarButton } from '../EditAvatarButton';

const { size, line_height, letter_spacing, weight } = tokens.font;

export const EditAvatarButton = styled(BaseEditAvatarButton)`
  position: absolute;
  z-index: 1;
  bottom: 0;
  right: 0;

  @media ${QUERIES.laptopAndUp} {
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
