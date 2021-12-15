import { css } from '@emotion/react';
import { BUTTON_SIZE } from '../consts';
import { ConditionalSpinner } from '../../Spinner';
import { BaseButtonProps as IconButtonProps } from '../types';
import { getGlobalButtonStyle } from '../utils';

const iconButtonStyle = css`
  width: ${BUTTON_SIZE};
`;

export const IconButton = ({ variant, icon, loading, ...props }: IconButtonProps) => (
  <button css={[getGlobalButtonStyle(variant), iconButtonStyle]} {...props}>
    <ConditionalSpinner loading={loading}>{icon}</ConditionalSpinner>
  </button>
);
