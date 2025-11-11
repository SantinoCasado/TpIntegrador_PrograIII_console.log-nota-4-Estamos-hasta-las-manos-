var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Importacion de rutas api para el frontend
// var productsApiRouter = require('./routes/api/products');
// var salesApiRouter = require('./routes/api/sales');
// var usersApiRouter = require('./routes/api/users');

// Importar rutas Admin para el backend
// var adminLoginRouter = require('./routes/admin/login');
// var adminDashboardRouter = require('./routes/admin/dashboard');

var app = express();
app.use(cors());

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

// Rutas API (para el frontend) - descomentá cuando las tengas
// app.use('/api/products', productsApiRouter);
// app.use('/api/sales', salesApiRouter);
// app.use('/api/users', usersApiRouter);

// Rutas Admin (para el backend) - descomentá cuando las tengas
// app.use('/admin', adminLoginRouter);
// app.use('/admin', adminDashboardRouter);

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
