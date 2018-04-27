const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.base.js');

module.exports = merge(common, {
    entry: [
        'webpack-hot-middleware/client'
        , './client/index.js'
    ]
    , output: {
        path: path.join(__dirname, "../dev/"),
        publicPath: "/dev/",
        filename: "[name].[hash].js",
    }
    , mode: 'development'
    , devServer: {inline: true}
    , devtool: 'eval-source-map'
});
