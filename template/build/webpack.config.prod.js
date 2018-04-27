const path = require("path");
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.base.js');

module.exports = merge(common, {
    entry: [
        './client/index.js'
    ]
    ,output: {
        path: path.join(__dirname, "../dist/"),
        publicPath: "/",
        filename: "[name].[hash].js",
    }
    , mode: 'production'
});

