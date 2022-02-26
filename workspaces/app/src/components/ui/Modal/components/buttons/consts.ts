import { css } from '@emotion/react';
import tokens from 'styles/tokens';

const SIZE = '45px';

export const CONTROL_BUTTON_STYLE = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${SIZE};
  height: ${SIZE};
  color: ${tokens.font.color.primary};
  background-color: ${tokens.background.color.secondary};
  border: none;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 30px;

  &:hover {
    cursor: pointer;
  }
`;
