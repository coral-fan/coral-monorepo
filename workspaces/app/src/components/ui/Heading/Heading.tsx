import { css, jsx } from '@emotion/react';
import { FC } from 'react';
import tokens from 'styles/tokens';

const {
  font: {
    size: { lg, md, sm },
  },
} = tokens;

const fontSizeDictionary = {
  1: lg,
  2: md,
  3: sm,
};

export type HeadingLevel = keyof typeof fontSizeDictionary;
export interface HeadingProp {
  level: HeadingLevel;
}

const getHeadingStyle = (level: HeadingLevel) => css`
  font-weight: bold;
  color: ${tokens.font.color.primary};
  font-size: ${fontSizeDictionary[level]};
  ${level === 2
    ? css`
        border-bottom: solid ${tokens.border.color.secondary} 1px;
        padding-bottom: 8px;
      `
    : undefined}
  ${level === 3
    ? css`
        text-transform: uppercase;
      `
    : undefined}
`;

export const Heading: FC<HeadingProp> = ({ children, level, ...props }) =>
  jsx(`h${level}`, { css: getHeadingStyle(level), ...props }, children);
