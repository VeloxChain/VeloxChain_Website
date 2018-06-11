var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var oauthserver = require('oauth2-server');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var app = express();

app.oauth = oauthserver({
  model: require('./models/auth.js'),
  grants: ['password'],
  debug: true
});

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: false, limit: '5mb'
}));
app.use(bodyParser.json({limit: '5mb'}));

app.all('/oauth/token', app.oauth.grant());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/admin_build')));

app.use('/', indexRouter);

app.use(app.oauth.authorise(),function (req, res, next) {
  return next();
});
app.use(app.oauth.errorHandler());
app.get('/admin/pre-sale', indexRouter.getPresale);
app.get('/admin/get_overview_information', indexRouter.getOverviewInformation);
app.put('/admin/pre_sale/:presale_id', indexRouter.updatePreSale);
app.get('/admin/whitelist', indexRouter.getWhitelist);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
