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
  color: ${tokens.color.white};
  font-size: ${`${fontSizeDictionary[level]}px`};
  ${level === 3 ? 'text-transform: uppercase;' : null}
`;

export const Heading: FC<HeadingProp> = ({ children, level }) =>
  jsx(`h${level}`, { css: getHeadingStyle(level) }, children);
