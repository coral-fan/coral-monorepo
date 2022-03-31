import styled from '@emotion/styled';
import { BaseButton } from 'components/ui/buttons/BaseButton';
import { getIconComponent } from 'components/ui/icons/utils';
import { QUERIES } from 'styles';
import editAvatarSVG from './editAvatar.svg';

const EditAvatarIcon = getIconComponent('EditAvatarIcon', editAvatarSVG);

const Button = styled(BaseButton)`
  width: 40px;
  height: 40px;

  @media ${QUERIES.laptopAndUp} {
    width: 45px;
    height: 45px;
  }
`;

export const EditAvatarButton = ({ ...props }) => (
  <Button {...props}>
    <EditAvatarIcon />
  </Button>
);
