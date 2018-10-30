var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

var config = {
  context: path.join(__dirname, "src"),
  devtool: debug
    ? "inline-sourcemap"
    : null,
  entry: "./javascript/client.js",
  output: {
    path: __dirname + "/src/",
    filename: 'bundle.min.js'
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    port: 3002,
  },

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
        loader: 'yaml'
      },
    ]
  },

  plugins: debug
    ? []
    : [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack
        .optimize
        .DedupePlugin(),
      new webpack
        .optimize
        .OccurenceOrderPlugin(),
      new webpack.ProvidePlugin({$: "jquery", jquery: "jquery", "window.jQuery": "jquery", jQuery: "jquery",}),
      // new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),,,,,,,,,,,,,,,,
    ]
}
module.exports = config;
