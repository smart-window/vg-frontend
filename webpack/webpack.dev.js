const webpack = require('webpack')
const commonPaths = require('./paths')

/*
  react-dev-utils
  https://github.com/facebook/create-react-app/tree/master/packages/react-dev-utils
*/
const eslintFormatter = require('react-dev-utils/eslintFormatter')
// adds a better local error page
const webpackDevClientEntry = require.resolve(
  'react-dev-utils/webpackHotDevClient'
)

module.exports = {
  mode: 'development',
  entry: [
    webpackDevClientEntry,
    commonPaths.entryPath,
  ],
  output: {
    filename: 'bundle.js',
    path: commonPaths.publicPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: commonPaths.appSrc,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              // Pass the formatter:
              formatter: eslintFormatter,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    compress: true,
    contentBase: commonPaths.publicPath,
    historyApiFallback: true,
    hot: true,
    watchContentBase: true,

    transportMode: 'ws',
    injectClient: false,
  },
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  // react-hot-loader hook support
  resolve: {
    alias: { 'react-dom': '@hot-loader/react-dom' }
  }
}
