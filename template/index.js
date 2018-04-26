const NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express')
const path = require('path');

const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackAssets = require('express-webpack-assets')

const index = require('./routes/index');
const app = express()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

if (NODE_ENV === 'production') {
  app.use(express.static(__dirname + '/dist'));
} else {
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }
  }))
  app.use(webpackHotMiddleware(compiler))
}

app.use(webpackAssets('./config/webpack-assets.json', {
    devMode: NODE_ENV !== 'production'
}));


app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))
