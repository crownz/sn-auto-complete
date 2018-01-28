const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: path.resolve(__dirname, '../app'),
  server: path.resolve(__dirname, '../server'),
  build: path.resolve(__dirname, '../build'),
};

const clientConfig = () => {
  return {
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
    devtool: 'source-map',
    output: {
      path: PATHS.build,
      publicPath: '/bundle/',    
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js',    
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
        filename: 'vendors.[chunkhash].js',
        minChunks: Infinity,
      }),
      new AssetsPlugin({
        filename: './server/app-manifest.json',
        fullPath: false,
      }),
      new ExtractTextPlugin({
        filename: 'styles.[chunkhash].css',
        allChunks: true,
      }),
    ],
  };
};

const serverConfig = () => {
  const nodeModules = fs
    .readdirSync(path.resolve(__dirname, '../node_modules'))
    .reduce((ext, mod) => Object.assign(ext, { [mod]: `commonjs ${mod}` }), {});
  
  return {
    externals: nodeModules,
    context: PATHS.server,
    target: 'node',
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false,
    },
    entry: {
      server: path.join(PATHS.server, 'index.js'),
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                minimize: true,
                import: true,
                importLoaders: 1,
              },
            },
            
          ],
        },
        {
          test: /\.js$|.jsx$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
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
      ],
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    ],
  };
};

module.exports = [clientConfig(), serverConfig()];
