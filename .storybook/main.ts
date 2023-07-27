/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../shared/src/**/*.stories.@(ts|tsx)',
    '../admin/src/**/*.stories.@(ts|tsx)',
    '../app/src/**/*.stories.@(ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    'storybook-addon-react-router-v6',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
