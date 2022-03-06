import { css, jsx } from '@emotion/react';
import { FC } from 'react';
import tokens from 'styles/tokens';

const { font } = tokens;

const fontSizeDictionary = {
  1: font.size.xl,
  2: font.size.lg,
  3: font.size.md,
};

export type HeadingLevel = keyof typeof fontSizeDictionary;
export interface HeadingProp {
  level: HeadingLevel;
}

const getHeadingStyle = (level: HeadingLevel) => css`
  font-weight: bold;
  color: ${font.color.primary};
  font-size: ${fontSizeDictionary[level]};
`;

export const Heading: FC<HeadingProp> = ({ children, level, ...props }) =>
  jsx(`h${level}`, { css: getHeadingStyle(level), ...props }, children);
