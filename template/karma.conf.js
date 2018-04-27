const webpackConfig = require('./build/webpack.config.dev.js')

module.exports = function (config) {
    config.set({
        frameworks: ['mocha'],
        files: [
            'test/**/*.spec.js'
        ],
        preprocessors: {
            '**/*.spec.js': ['eslint', 'webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        reporters: ['spec'],
        browsers: ['jsdom']
    })
}
