import styled from '@emotion/styled';
import { profileInfoSizeDictionary } from './consts';
import { Size } from './types';
import tokens from 'styles/tokens';

export interface NameProp {
  size: Size;
}

export const Name = styled.div<NameProp>`
  font-size: ${({ size }) => `${profileInfoSizeDictionary[size].nameFontSize}px`};
  color: ${tokens.font.color.primary};
  line-height: ${({ size }) => `${profileInfoSizeDictionary[size].nameLineHeight}px`};
`;
