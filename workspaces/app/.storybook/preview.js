import { themes } from '@storybook/theming';
import * as NextImage from 'next/image';
import { css, Global } from '@emotion/react';
import { globalTokens } from 'styles/tokens';
import { globalStyles } from 'styles/global';

// work around for Next Image in Storybook from https://storybook.js.org/blog/get-started-with-storybook-and-next-js/
const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

const storybookStyleOverrides = css`
  html {
    background-color: #373737;
  }
`;
export const decorators = [
  (Story) => (
    <>
      <Global styles={[globalStyles, globalTokens, storybookStyleOverrides]} />
      <Story />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    current: 'dark',
  },
};
