const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    devtool: 'inline-source-map',
    resolve: {
      alias: {
        "@/*": path.resolve(__dirname, './*')
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
    entry: {
      serviceWorker: './src/serviceWorker/serviceWorker.ts',
      contentScript: './src/contentScript/contentScript.ts',
      pageScript: './src/pageScript/pageScript.ts',
      popup: './src/popup/index.tsx'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            'css-loader',
            "postcss-loader"
          ],
        },
      ],
    },
    plugins: [
      new ESLintPlugin({
        context: path.resolve(__dirname, 'src'),
        overrideConfigFile: path.resolve(__dirname, './eslint.config.mjs'),
        configType: 'flat',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: "static/manifest.json",
            noErrorOnMissing: true,
          },
        ],
      }),
      new HtmlWebpackPlugin ({ template: './static/popup-template.html', filename: "popup.html", chunks: ["popup"]})
    ]
  }
};