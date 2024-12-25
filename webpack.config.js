const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const defaultManifest = require('./static/manifest.json');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    entry: {
      serviceWorker: './src/serviceWorker/serviceWorker.ts',
      contentScript: './src/contentScript/contentScript.ts',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new ESLintPlugin({
        context: path.resolve(__dirname, 'src'),
        overrideConfigFile: path.resolve(__dirname, './eslint.config.mjs'),
        configType: 'flat',
      }),
      new WebpackManifestPlugin({
        fileName: 'manifest.json',
        generate: (seed, files, entries) => {
          const defaultManifestString = JSON.stringify(defaultManifest);

          // Replace the placeholders in the default manifest with the actual filenames
          const massagedManifestString = defaultManifestString
            .replace(/CONTENT_SCRIPT_FILENAME/, entries.contentScript[0])
            .replace(/SERVICE_WORKER_FILENAME/, entries.serviceWorker[0]);

          return JSON.parse(massagedManifestString);
        },
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "static",
            noErrorOnMissing: true,
            filter: (resourcePath) => !resourcePath.endsWith('manifest.json')
          },
        ],
      })
    ]
  }
};