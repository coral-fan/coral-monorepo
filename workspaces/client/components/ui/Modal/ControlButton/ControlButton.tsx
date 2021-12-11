import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { CloseIcon, LeftArrowIcon } from './Icons';

interface ControlButtonProps {
  variant: 'close' | 'previous';
}

const SIZE = '30px';

const controlButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${SIZE};
  height: ${SIZE};
  color: ${tokens.color.white};
  background-color: ${tokens.color.background.secondary};
  border: 0.5px solid #534b58;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
`;

export const ControlButton = ({ variant }: ControlButtonProps) => (
  <button css={[controlButtonStyle]}>
    {variant === 'close' ? <CloseIcon /> : <LeftArrowIcon />}
  </button>
);
