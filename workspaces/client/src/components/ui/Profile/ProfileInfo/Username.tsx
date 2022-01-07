import styled from '@emotion/styled';
import { profileInfoSizeDictionary } from './consts';
import { Size } from './types';
import tokens from 'styles/tokens';

export interface UsernameProp {
  size: Size;
}

export const Username = styled.div<UsernameProp>`
  font-size: 10px;
  font-weight: bold;
  color: ${tokens.color.gray};
  line-height: ${({ size }) => `${profileInfoSizeDictionary[size].usernameLineHeight}px`};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;
