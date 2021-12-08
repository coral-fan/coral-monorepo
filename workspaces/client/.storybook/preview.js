import { themes } from '@storybook/theming';

import '../styles/global.css';

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
