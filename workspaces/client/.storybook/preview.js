import { themes } from '@storybook/theming';

import { Global } from '@emotion/react';
import { globalTokens } from 'styles/tokens';

import 'styles/global.css';

export const decorators = [
  (Story) => (
    <>
      <Global styles={globalTokens} />
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

/*
  storybook configurations for nextjs
  https://storybook.js.org/blog/get-started-with-storybook-and-next-js/
 */
