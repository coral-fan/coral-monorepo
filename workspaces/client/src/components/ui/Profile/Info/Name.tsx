import styled from '@emotion/styled';
import { infoSizeDictionary, Size } from './consts';
import tokens from 'styles/tokens';

export interface NameProp {
  size: Size;
}

export const Name = styled.div<NameProp>`
  font-size: ${({ size }) => `${infoSizeDictionary[size].nameFontSize}px`};
  color: ${tokens.color.white};
  line-height: ${({ size }) => `${infoSizeDictionary[size].nameLineHeight}px`};
`;
