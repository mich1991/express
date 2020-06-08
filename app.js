var createError = require('http-errors');
var cookieSession = require('cookie-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config')
var mongoose = require('mongoose')

// before routes
mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('db connect');
})


var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var newsRouter = require('./routes/news');
var pollRouter = require('./routes/poll');

// mongoDB atlas db adress in config.js
// mongodb+srv://mich1991:<password>@learningcluster-iyh2k.mongodb.//net/<dbname>?retryWrites=true&w=majority
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
  // cookie options in config.js
  name: 'session',
  keys: config.keySession,
  maxAge: config.maxAgeSession//24h
}))

app.use(function (req, res, next) {
  // assign req.path to local variable as a "path"
  res.locals.path = req.path
  // let routing go on
  next()
})


app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/poll', pollRouter);
app.use('/admin', adminRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
