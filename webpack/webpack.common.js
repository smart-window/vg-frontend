const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const commonPaths = require('./paths')
const dotenv = require('dotenv').config()

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  esmodules: true,
                },
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/transform-react-constant-elements',
            '@babel/transform-react-inline-elements',
            'transform-react-remove-prop-types',
            'transform-react-pure-class-to-function',
            '@babel/plugin-transform-runtime',
            'react-hot-loader/babel',
            // Stage 2 https://github.com/babel/babel/tree/master/packages/babel-preset-stage-2
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-proposal-function-sent',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-numeric-separator',
            '@babel/plugin-proposal-throw-expressions',

            // Stage 3
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-proposal-json-strings',
          ],
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.imagesFolder,
            },
          },
        ],
      },
      {
        test: /\.(woff2|ttf|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: commonPaths.fontsFolder,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // add all .env variables
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(
        filterEnvVars(process.env || dotenv.parsed)
      )
    }),
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
      // inject these .env variables into index.html
      pegaMashupScriptSrc: process.env.REACT_APP_PEGA_MASHUP_SCRIPTS_SRC || dotenv.parsed.REACT_APP_PEGA_MASHUP_SCRIPTS_SRC,
      analyticsScriptSrc: process.env.REACT_APP_ANALYTICS_SCRIPTS_SRC || dotenv.parsed.REACT_APP_ANALYTICS_SCRIPTS_SRC,
      analyticsId: process.env.REACT_APP_ANALYTICS_ID || dotenv.parsed.REACT_APP_ANALYTICS_ID,
      mapsScriptSrc: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GEOCODING_KEY || dotenv.parsed.REACT_APP_GEOCODING_KEY}&libraries=places`
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
  ],
}

/**
 * Filters out all config variables that don't start with REACT_APP
 * @param {object} env
 */
function filterEnvVars(env) {
  const filteredEnv = {}
  for (const key in env) {
    if (key.startsWith('REACT_APP')) {
      filteredEnv[key] = env[key]
    }
  }
  return filteredEnv
}
