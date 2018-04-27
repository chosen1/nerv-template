const NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');

const {VueLoaderPlugin} = require('vue-loader');
const SaveHashes = require('assets-webpack-plugin');

const config = require('./config.js')[NODE_ENV];

module.exports = {
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "eslint-loader",
                ]
            }
            , {
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
    , plugins: [
        new VueLoaderPlugin()
        , new webpack.HotModuleReplacementPlugin()
        , new SaveHashes({
            path: config.assets_path
        })
        , new webpack.DefinePlugin({
            IS_DEV: JSON.stringify(true)
        })]
};
