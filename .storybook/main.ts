import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-webpack5', options: {} },
  webpackFinal: async (webpackConfig) => ({
    ...webpackConfig,
    module: {
      ...webpackConfig.module,
      rules: [
        ...(webpackConfig.module?.rules ?? []),
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: { loader: 'ts-loader', options: { transpileOnly: true } },
        },
      ],
    },
    resolve: {
      ...webpackConfig.resolve,
      extensions: [...(webpackConfig.resolve?.extensions ?? []), '.ts', '.tsx'],
    },
  }),
};

export default config;
