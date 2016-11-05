'use strict';

let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let mongoose = require('mongoose');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

/**
 * MODELS
 */

let gameModel = require('./application/models/game.model');
let roomModel = require('./application/models/room.model');
let userModel = require('./application/models/user.model');

/**
 * ROUTES
 */

let routes = require('./application/routes/index');
let gamesRoutes = require('./application/routes/games.route');
let roomsRoutes = require('./application/routes/rooms.route');
let usersRoutes = require('./application/routes/users.route');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/games', gamesRoutes);
app.use('/rooms', roomsRoutes);
app.use('/users', usersRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

mongoose.connect('mongodb://localhost:27017/boink_db', err => {
  if (!err) {
    console.log('connected!');
  } else {
    console.log('failed to connect', err);
  }
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
