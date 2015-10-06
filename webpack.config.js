/**
 * Created by keith on 13/02/15.
 */
var webpack = require('webpack');
var util = require('util');
var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var pkg = require('./package.json');
var port = pkg.config.devPort,
    host = pkg.config.devHost,
    user = pkg.config.devAccount,
    https = pkg.config.devHttps,
    serverurl = util.format('http%s://%s:%d', https ? 's' : '', host, port);

var DEBUG = process.env.NODE_ENV === 'development';
var TEST = process.env.NODE_ENV === 'test';
var VISUALFORCE = process.env.BUILD_TARGET === 'visualforce';

var jsBundle = path.join('js', util.format('[name].%s.js', pkg.version));
var cssBundle = path.join('css', util.format('[name].%s.css', pkg.version));


var plugins = [
  new webpack.NoErrorsPlugin(),
  new ExtractTextPlugin(cssBundle, {  allChunks: true}),
  new webpack.optimize.OccurenceOrderPlugin()
];


var jsxLoader = ['react-hot', 'babel-loader?optional=runtime'];
var sassParams = [
  'outputStyle=expanded',
  'includePaths[]=' + path.resolve(__dirname, '../app/scss'),
  'includePaths[]=' + path.resolve(__dirname, '../node_modules')
];

var cssLoader = ExtractTextPlugin.extract('style-loader',[
    'css-loader',
    'postcss-loader'
  ].join('!'));
var sassLoader = ExtractTextPlugin.extract('style-loader', [
    'css-loader',
    'postcss-loader',
    'sass-loader?' + sassParams.join('&')
  ].join('!'));

var fileLoader = 'file-loader?name=[path][name].[ext]';

var htmlLoader = fileLoader + '!' +
  'template-html-loader?' + [
    'raw=true',
    'engine=lodash',
    'version=' + pkg.version,
    'TITLE=' + pkg.name,
    'DEBUG=' + DEBUG,
    'SERVER_URL=' + serverurl
  ].join('&')


var config = {
    context: path.join(__dirname, 'auraapp'),
    entry: {
      app: ['./app_index.jsx']
    },
    /* Switch loaders to debug mode. */
    debug: DEBUG,
    cache: DEBUG,
    target: 'web',
    /* Choose a developer tool to enhance debugging */
    devtool: DEBUG || TEST ? 'inline-source-map' : false,
    output: {
        path: path.resolve(pkg.config.buildDir),
        filename: jsBundle,
        publicPath: '/',
        pathinfo: false
    },
    plugins: plugins,
    module: {
        loaders: [
            {
              test: /\.jsx$|\.es6$/,
              exclude: /node_modules/,
              loaders: jsxLoader
            },
            {
              test: /\.css$/,
              loader: cssLoader
            },
            {
              test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff$|\.woff2$|\.ttf$/,
              loader: fileLoader
            },
            {
              test: /\.html$/,
              loader: htmlLoader
            },
            {
               test: /\.scss$/,
               loader: sassLoader
            }
        ]
    },
    devServer: {
      contentBase: path.resolve(pkg.config.buildDir),
      hot: true,
      noInfo: false,
      inline: true,
      stats: { colors: true }
    }
};

module.exports = config;
