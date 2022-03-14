import { css, jsx } from '@emotion/react';
import { FC } from 'react';
import tokens from 'styles/tokens';

const { color, weight, size, line_height, letter_spacing } = tokens.font;

const headingStyle = css`
  font-weight: ${weight.bold};
  color: ${color.primary};
`;

const h1Style = css`
  ${headingStyle};
  font-size: ${size.xxl};
  line-height: ${line_height.xxl};
  letter-spacing: ${letter_spacing.xxl};
`;

const h2Style = css`
  ${headingStyle};
  font-size: ${size.xl};
  line-height: ${line_height.xl};
  letter-spacing: ${letter_spacing.xl};
`;

const h3Style = css`
  ${headingStyle};
  font-size: ${size.lg};
  line-height: ${line_height.lg};
  letter-spacing: ${letter_spacing.lg};
`;

const h4Style = css`
  ${headingStyle};
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

export interface HeadingProps {
  level: HeadingLevel;
  styleVariant: HeadingStyleVariant;
}

export const Heading: FC<HeadingProps> = ({ children, level, styleVariant, ...props }) =>
  jsx(`h${level}`, { css: styleDictionary[styleVariant], ...props }, children);
