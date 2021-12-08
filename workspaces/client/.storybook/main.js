module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
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
};
