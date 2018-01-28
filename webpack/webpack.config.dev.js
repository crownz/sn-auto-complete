const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './app/components/index.tsx',
    vendors: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk',
    ],
  },
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/bundle/',    
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: "css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]" },
            { loader: "sass-loader" },
          ],
        }),
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: 'vendors.js',
      minChunks: Infinity,
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
  ],
};