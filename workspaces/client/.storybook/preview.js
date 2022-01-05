import { themes } from '@storybook/theming';
import * as nextImage from 'next/image';
import { GlobalStyles } from 'styles';

Object.defineProperty(nextImage, 'default', {
  configurable: true,
  value: (props) => <img {...props} />,
});

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
