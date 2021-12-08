const path = require('path');

module.exports = {
  stories: ['../**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', 'storybook-dark-mode'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  /*
    configuration below is neccessary for storybook to work.
    https://github.com/storybookjs/storybook/issues/15336
    storybook won't be able to automatically infer props from your component without docgen.
    this means we will need to manually input each prop and their type into storybook.
    but better than nothing *shrugs*
  */
  // TODO: check back to see if this issue above becomes resolved
  typescript: { reactDocgen: false },
  features: {
    babelModeV7: true,
  },
  webpackFinal: (config) => {
    config.resolve.modules.unshift(path.resolve('src'));
    /* 
    set up aliases to resolve issues with emotion 11
    https://stackoverflow.com/questions/65894711/module-not-found-error-cant-resolve-emotion-styled-base-when-running-story
    */
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/styled': path.resolve('../../node_modules', '@emotion/styled'),
      '@emotion/core': path.resolve('../../node_modules', '@emotion/react'),
      'emotion-theming': path.resolve('../../node_modules', '@emotion/react'),
    };

    return config;
  },
};
