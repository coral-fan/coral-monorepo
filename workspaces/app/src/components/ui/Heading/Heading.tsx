import { css, jsx } from '@emotion/react';
import { FC } from 'react';
import tokens from 'styles/tokens';

const { color, weight, size, line_height, letter_spacing } = tokens.font;

const fontSizeDictionary = {
  h1: size.xxl,
  h2: size.xl,
  h3: size.lg,
  h4: size.md,
};

const lineHeightDictionary = {
  h1: line_height.xxl,
  h2: line_height.xl,
  h3: line_height.lg,
  h4: line_height.md,
};

const letterSpacingDictionary = {
  h1: letter_spacing.xxl,
  h2: letter_spacing.xl,
  h3: letter_spacing.lg,
  h4: letter_spacing.md,
};

export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingStyleVariant = keyof typeof fontSizeDictionary;

export interface HeadingProps {
  level: HeadingLevel;
  styleVariant: HeadingStyleVariant;
}

const getHeadingStyle = (styleVariant: HeadingStyleVariant) => css`
  font-weight: ${weight.bold};
  color: ${color.primary};
  font-size: ${fontSizeDictionary[styleVariant]};
  line-height: ${lineHeightDictionary[styleVariant]};
  letter-spacing: ${letterSpacingDictionary[styleVariant]};
`;

export const Heading: FC<HeadingProps> = ({ children, level, styleVariant, ...props }) =>
  jsx(`h${level}`, { css: getHeadingStyle(styleVariant), ...props }, children);
