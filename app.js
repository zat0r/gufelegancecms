var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersInfoRouter = require('./routes/userinfo');
var apiRouter = require('./routes/api');
var proRouter = require('./routes/prodacts');
var proInfoRouter = require('./routes/proinfo');
var catRouter = require('./routes/categories');
var filesmanage = require('./routes/handler');
var Whatsappmanage = require('./routes/whatsapp');
var WAjson = require('./routes/wajson');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/users/:userId', usersInfoRouter); 
app.use('/api', apiRouter);
app.use('/prodacts', proRouter);
app.use('/categories', catRouter);
app.use('/prodacts/:proId', proInfoRouter);
app.use('/uploadfile', filesmanage);
app.use('/WA', Whatsappmanage);
app.use('/WAjson', WAjson)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
