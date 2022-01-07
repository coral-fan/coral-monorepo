import styled from '@emotion/styled';
import { infoSizeDictionary } from './consts';
import tokens from 'styles/tokens';

type Size = keyof typeof infoSizeDictionary;

export interface UsernameProp {
  size: Size;
}

export const Username = styled.div<UsernameProp>`
  font-size: 10px;
  font-weight: bold;
  color: ${tokens.color.gray};
  line-height: ${({ size }) => `${infoSizeDictionary[size].userNameLineHeight}px`};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;
