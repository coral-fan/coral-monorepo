import { css } from '@emotion/react';
import { ReactElement } from 'react';
import { BUTTON_SIZE } from '../consts/consts';
import { ConditionalSpinner } from '../../Spinner';
import { BaseButtonProps } from '../types';
import { getGlobalButtonStyle } from '../utils';

export interface IconButtonProps extends BaseButtonProps {
  icon: ReactElement<'svg'>;
}
const iconButtonStyle = css`
  width: ${BUTTON_SIZE};
`;

export const IconButton = ({ variant, icon, loading, ...props }: IconButtonProps) => (
  <button css={[getGlobalButtonStyle(variant), iconButtonStyle]} {...props}>
    <ConditionalSpinner loading={loading}>{icon}</ConditionalSpinner>
  </button>
);
