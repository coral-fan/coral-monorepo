import { css } from '@emotion/react';
import { useLogout } from 'libraries/authentication';
import { Avatar } from 'components/ui/profile';
import { buttonBaseStyle } from 'components/ui/buttons/styles';

const profileAvatarButtonStyle = css`
  ${buttonBaseStyle}
  margin-left: auto;
`;

export const ProfileAvatarButton = () => {
  const logout = useLogout();
  return (
    <button css={profileAvatarButtonStyle} onClick={logout}>
      <Avatar hasBorder={true} size={30} />
    </button>
  );
};
