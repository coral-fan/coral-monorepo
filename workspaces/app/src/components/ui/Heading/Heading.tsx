import { css, jsx } from '@emotion/react';
import { FC } from 'react';
import tokens from 'styles/tokens';
import { Variant } from '../Card';

const { color, weight, size, line_height, letter_spacing } = tokens.font;

const h1Style = css`
  font-size: ${size.xxl};
  line-height: ${line_height.xxl};
  letter-spacing: ${letter_spacing.xxl};
`;

const h2Style = css`
  font-size: ${size.xl};
  line-height: ${line_height.xl};
  letter-spacing: ${letter_spacing.xl};
`;

const h3Style = css`
  font-size: ${size.lg};
  line-height: ${line_height.lg};
  letter-spacing: ${letter_spacing.lg};
`;

const h4Style = css`
  font-size: ${size.md};
  line-height: ${line_height.md};
  letter-spacing: ${letter_spacing.md};
  text-transform: uppercase;
`;

const styleDictionary = {
  h1: h1Style,
  h2: h2Style,
  h3: h3Style,
  h4: h4Style,
};

export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingStyleVariant = keyof typeof styleDictionary;

const getHeadingStyle = (
  styleVariant: HeadingStyleVariant,
  colorVariant: Variant = 'primary'
) => css`
  font-weight: ${weight.bold};
  color: ${color[colorVariant]};
  ${styleDictionary[styleVariant]}
`;
export interface HeadingProps {
  level: HeadingLevel;
  styleVariant: HeadingStyleVariant;
  colorVariant?: Variant;
}

export const Heading: FC<HeadingProps> = ({
  children,
  level,
  styleVariant,
  colorVariant,
  ...props
}) => jsx(`h${level}`, { css: getHeadingStyle(styleVariant, colorVariant), ...props }, children);
