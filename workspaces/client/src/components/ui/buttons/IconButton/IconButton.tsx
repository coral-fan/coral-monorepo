import { css } from '@emotion/react';
import { BUTTON_SIZE } from '../consts';
import { ConditionalSpinner } from '../../Spinner';
import { BaseButtonProps } from '../types';
import { getButtonVariantStyle } from '../utils';

const iconButtonStyle = css`
  width: ${BUTTON_SIZE};
`;

export const IconButton = ({ children, variant, loading, ...props }: BaseButtonProps) => (
  <button css={[getButtonVariantStyle(variant), iconButtonStyle]} {...props}>
    <ConditionalSpinner loading={loading}>{children}</ConditionalSpinner>
  </button>
);
