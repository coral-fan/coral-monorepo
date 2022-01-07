import styled from '@emotion/styled';
import { infoSizeDictionary } from './consts';
import tokens from 'styles/tokens';

type Size = keyof typeof infoSizeDictionary;

export interface NameProp {
  size: Size;
}

export const Name = styled.div<NameProp>`
  font-size: ${({ size }) => `${infoSizeDictionary[size].nameFontSize}px`};
  color: ${tokens.color.white};
  line-height: ${({ size }) => `${infoSizeDictionary[size].nameLineHeight}px`};
`;
