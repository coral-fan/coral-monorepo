import { css, jsx } from '@emotion/react';
import { FC } from 'react';
import tokens from 'styles/tokens';

const fontSizeDictionary = {
  1: 24,
  2: 18,
  3: 14,
};

type Level = keyof typeof fontSizeDictionary;
export interface HeadingProp {
  level: Level;
}

const getHeadingStyle = (level: Level) => css`
  font-weight: bold;
  color: ${tokens.font.color.primary};
  font-size: ${`${fontSizeDictionary[level]}px`};
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
