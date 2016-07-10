const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const StatsPlugin = require('stats-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || process.env.RAILS_ENV || 'development';
const isTest = nodeEnv == 'test';
const isDev = nodeEnv == 'development';
const isProd = nodeEnv == 'production' || nodeEnv == 'staging';

config = {
  context: __dirname,

  entry: {
    vendor: './src/vendor.js',
    styles: './styles/main.scss',
    app: './src/bootstrap.jsx'
  },

  output: {
    filename: '[name].js',
    path: '../public/webpack',
    publicPath: '/webpack/',
  },

  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx', '.json', '.scss', '.css']
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    new StatsPlugin('manifest.json', {
      chunkModules: false,
      source: false,
      chunks: false,
      modules: false,
      assets: true
    }),
  ],

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint?parser=babel-eslint',
        exclude: /node_modules/
      }
    ],

    loaders:[
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!postcss!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },
    ]
  },

  postcss: [
    autoprefixer({
      browsers: ['last 2 version', 'IE >= 10']
    })
  ],
};

if (isTest) {
  config.devtool = 'inline-source-map';

  // http://airbnb.io/enzyme/docs/guides/webpack.html
  config.externals = Object.assign({}, config.externals, {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  });
}

if (!isTest) {
  config.plugins = config.plugins.concat([
    // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    // https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: `vendor${isProd ? '-[hash]' : ''}.js`,
      minChunks: Infinity,
    }),
  ]);
}

if (isDev) {
  config.devtool = 'cheap-module-eval-source-map';

  config.devServer = {
    port: 3808,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: 'minimal' // none (or false), errors-only, minimal, normal (or true) and verbose
  };
  config.output.publicPath = `//localhost:3808/webpack/`;
}

if (isProd) {
  config.output.filename = '[name]-[hash].js';

  config.plugins = config.plugins.concat([
    // https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),
  ]);
}

module.exports = config;
