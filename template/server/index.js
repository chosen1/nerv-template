const NODE_ENV = process.env.NODE_ENV || 'development'

const path = require('path')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackAssets = require('express-webpack-assets')

const express = require('express')
const webpackConfig = require('../build/webpack.config.dev.js')

const index = require('./routes/index')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))
if (NODE_ENV === 'production') {
    // if we are in production just distribute the precompiled client from the dist folder
    app.use(express.static(path.join(__dirname, '../dist')))
    app.use(webpackAssets('./dist/webpack-assets.json'))
} else {
    // if we are in dev create the bundle and use hot-reload
    let compiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath, stats: {colors: true} }))
    app.use(webpackHotMiddleware(compiler))
    app.use(webpackAssets('./dev/webpack-assets.json', {devMode: true}))
}

app.use('/', index)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found')
    err.status = 404
    next(err)
})


app.listen(3000, () => console.log('{{name}} listening on port 3000!'))
