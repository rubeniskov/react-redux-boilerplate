const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const mode = process.env.NODE_ENV || 'production';
const __DEV__ = mode === 'development';
const __PRO__ = mode === 'production';
const entry = require.resolve('.');
const dirname = path.dirname(entry);

module.exports = {
  mode,
  entry: {
    main: [require.resolve('.')]
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: __DEV__ ? '[name].js' : '[name].[hash].js',
  },
  devtool: __DEV__ ? 'source-map' : false,
  module: {
    rules: []
  },
  resolve: {
    alias: {
      '@local': path.resolve(__dirname, 'src')
    },
    extensions: ['*', '.js', '.json']
  },
  plugins: [
    new webpack.DefinePlugin(Object.assign({
      'process.env': { NODE_ENV: JSON.stringify(mode) },
      __DEV__
    }, {/* GLOBALS */ }))
  ]/* ,
  devServer: {
    contentBase: './dist',
    hot: true
  // } */
};


// JavaScript
// ------------------------------------

module.exports.module.rules.push({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader']
});


// Linter
// ------------------------------------
module.exports.module.rules.push({
  test: /\.js$/,
  exclude: /node_modules/,
  use: ['eslint-loader']
});

// Styles
// ------------------------------------
module.exports.module.rules.push({
  test: /\.scss$/,
  use: [
    'style-loader', // creates style nodes from JS strings
    'css-loader', // translates CSS into CommonJS
    'sass-loader' // compiles Sass to CSS, using Node Sass by default
  ]
});

// Fonts
// ------------------------------------
[
  ['woff', 'application/font-woff'],
  ['woff2', 'application/font-woff2'],
  ['otf', 'font/opentype'],
  ['ttf', 'application/octet-stream'],
  ['eot', 'application/vnd.ms-fontobject'],
  ['svg', 'image/svg+xml'],
].forEach((font) => {
  const extension = font[0];
  const mimetype = font[1];

  module.exports.module.rules.push({
    test: new RegExp(`\\.${extension}$`),
    loader: 'url-loader',
    options: {
      name: 'fonts/[name].[ext]',
      limit: 10000,
      mimetype,
    },
  });
});

// Images
// ------------------------------------
module.exports.module.rules.push({
  test: /\.(png|jpg|gif)$/,
  loader: 'url-loader',
  options: {
    limit: 8192,
  },
});

// HTML Template
// ------------------------------------
module.exports.plugins.push(new HtmlWebpackPlugin({
  template: path.join(dirname, 'index.html'),
  inject: true,
  minify: {
    collapseWhitespace: true,
  },
}));

// Development Tools
// ------------------------------------
if (__DEV__) {
  module.exports.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
}

// Production Optimizations
// ------------------------------------
if (__PRO__) {
  module.exports.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          warnings: false,
          compress: false,
          mangle: true
        }
      })
    ]
  };

  module.exports.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    })
  );
}
