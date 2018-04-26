const path = require("path");
const webpack = require('webpack');

const {VueLoaderPlugin} = require('vue-loader');
const SaveHashes = require('assets-webpack-plugin');

module.exports = {
    entry: [
        './client/index.js'
        , 'webpack-hot-middleware/client'
    ]
    , mode: 'development'
    , output: {
        path: path.join(__dirname, "public/dist/"),
        publicPath: "/dist/",
        filename: "[name].[hash].js",
    }
    , module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: ['node_modules']
            }
            , {
                test: /\.pug$/
                , use: ['pug-plain-loader']
            }
            , {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
    , resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    }
    , devServer: {inline: true}
    , devtool: 'eval-source-map'

    , plugins: [
        new VueLoaderPlugin()
        ,new webpack.HotModuleReplacementPlugin()
        ,new SaveHashes({
            path: path.join(__dirname, 'config')
        })
        ,new webpack.DefinePlugin({
            IS_DEV: JSON.stringify(true)
        })]
};
