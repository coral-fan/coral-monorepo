import { themes } from '@storybook/theming';

import { GlobalStyles } from 'styles';

export const decorators = [
  (Story) => (
    <>
      <GlobalStyles />
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
