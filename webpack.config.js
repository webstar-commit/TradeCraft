/* eslint-disable import/unambiguous */
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = function getWebpackConfig() {
  const isDev = (process.env.NODE_ENV === 'development');

  return {
    amd: {
      toUrlUndefined: true,
    },

    devServer: {
      compress: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      port: 3001,
      stats: 'errors-only',
    },

    devtool: isDev ? 'cheap-module-eval-source-map' : 'source-map',

    entry: getEntry(isDev),

    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    require('precss'),
                    require('autoprefixer'),
                  ];
                },
              },
            },
            { loader: 'sass-loader' },
          ],
        },
        {
          test: /\.(eot|svg|ttf)(\?[a-z0-9]+)?$/,
          loader: 'file-loader',
        },
        {
          test: /\.(gif|jpg|png)$/,
          use: [
            {
              loader: 'url-loader',
              options: { limit: 8192 },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            { loader: 'babel-loader' },
            { loader: `preprocess-loader?${isDev ? '+DEVELOPMENT' : ''}` },
          ],
        },
        {
          test: /\.woff(2)?(\?[a-z0-9]+)?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        },
        {test: /\.(config)$/, loader: 'file-loader?name=[name].[ext]'}

      ],

      unknownContextCritical: false,
    },

    node: {
      fs: 'empty',
    },

    output: {
      filename: '[name].[hash].js',
      path: path.join(__dirname, 'public'),
      publicPath: '/',
      sourcePrefix: '',
    },

    plugins: getPlugins(isDev),

    resolve: {
      alias: {
        cesium: 'cesium/Source',
        //cesiumNav: 'cesium/Source/viewerCesiumNavigationMixin',
      },
      extensions: ['.js', '.json'],
      modules: [
        path.join(__dirname, 'client'),
        'node_modules',
      ],
    },

    target: 'web',
  };
};

function getEntry(isDev) {
  const middlewares = [
    'babel-polyfill',
  ];

  if (isDev) {
    middlewares.push(
      'react-hot-loader/patch'
    );
  }

  return {
    app: [...middlewares, './client/index'],
  };
}

function getPlugins(isDev) {
  const plugins = [
    new CopyWebpackPlugin([
      { from: 'client/assets', to: 'assets' },
    ]),
    new CopyWebpackPlugin([
      { from: 'client/vendor', to: 'vendor' },
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.join(__dirname, 'client/index.html'),
    }),
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify('/Cesium'),
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'node_modules/cesium/Build/Cesium/Workers'), to: 'Cesium/Workers' },
    ]),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'node_modules/cesium/Source/Assets'), to: 'Cesium/Assets' },
    ]),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    }),
  ];

  if (isDev) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return plugins;
}
