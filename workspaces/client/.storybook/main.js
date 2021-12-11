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
  babel: (options) => {
    /*
    configuraton to enable css propin storybook
    https://github.com/storybookjs/storybook/issues/7540
   */
    options.presets.push('@emotion/babel-preset-css-prop');
    /*
    defines react for all files
    https://storybook.js.org/docs/react/workflows/faq
    */
    options.plugins.push('react-require', [
      '@babel/plugin-proposal-private-property-in-object',
      { loose: true },
    ]);
    return options;
  },
  webpackFinal: (config) => {
    // sets up relative imports to client directory
    config.resolve.modules.push(path.resolve('.'));
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
