import { css } from '@emotion/react';
import { FC } from 'react';
import { ConditionalSpinner } from '../../Spinner';
import { ComponentProps } from 'react';

export interface BaseButtonProps extends ComponentProps<'button'> {
  loading?: boolean;
}

const BaseButtonStyle = css`
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;

export const BaseButton: FC<BaseButtonProps> = ({ children, loading, ...props }) => (
  <button css={BaseButtonStyle} {...props}>
    <ConditionalSpinner loading={loading}>{children}</ConditionalSpinner>
  </button>
);
