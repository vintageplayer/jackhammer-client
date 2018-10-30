/* eslint-disable */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: './javascript/client.js',
  output: {
    path: __dirname + "/src/",
    filename: 'bundle.min.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack
      .optimize
      .OccurrenceOrderPlugin(),
    new webpack
      .optimize
      .UglifyJsPlugin(),
    new webpack.DefinePlugin({__DEVELOPMENT__: false, __DEVTOOLS__: false}),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'es2015', 'react',
          ],
          plugins: [
            'react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy',
          ],
        },
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      }, {
        test: /\.scss$/,
        loader: "sass-loader",
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        loader: "url-loader",
      }, {
        test: /\.ope/,
        loader: "style!css",
      }, {
        test: /\.yaml$/,
        include: path.resolve('data'),
        loader: 'yaml',
      },
    ]
  },
};
