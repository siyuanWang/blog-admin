var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var userController = require('./server/controller/UserController');
var articleController = require('./server/controller/ArticleController');
var commentController = require('./server/controller/CommentController');
var loginController = require('./server/controller/LoginController');

var app = express();
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images",express.static(path.join(__dirname, 'app/images')));
//默认node去寻找app下的index.html，作为app入口页面
app.use("/",express.static(path.join(__dirname, 'app')));
app.use("/login", express.static(path.join(__dirname, 'app/views/index/login.html')));
app.use(favicon(__dirname + '/favicon.ico'));

app.use(session({
  secret: 'foo',
  store: new MongoStore({
    // Basic usage
    host: '127.0.0.1', // Default, optional
    port: 27017, // Default, optional
    db: 'wsy', // Required
    collection: 'sessions',
    // Basic authentication (optional)
    username: 'wangsiyuan',
    password: '123456',

    // Advanced options (optional)
    autoReconnect: true, // Default
    w: 1, // Default,
    ssl: false // Default
  })
}));

app.use('/user', userController);
app.use('/article', articleController);
app.use('/comment', commentController);
app.use('/checkLogin', loginController);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var http = require('http');
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
}
