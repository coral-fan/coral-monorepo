import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { CloseIcon, LeftArrowIcon } from './Icons';

interface ModalControlButtonProps {
  variant: 'close' | 'previous';
}

const SIZE = '30px';

const modalControlButtonStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${SIZE};
  height: ${SIZE};
  color: ${tokens.color.pallete.white};
  background-color: ${tokens.color.background.secondary};
  border: 0.5px solid #534b58;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
`;

export const ModalControlButton = ({ variant }: ModalControlButtonProps) => (
  <button css={[modalControlButtonStyle]}>
    {variant === 'close' ? <CloseIcon /> : <LeftArrowIcon />}
  </button>
);
