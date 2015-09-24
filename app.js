var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var loginController = require('./server/controller/LoginController');
var userController = require('./server/controller/UserController');
var articleController = require('./server/controller/ArticleController');
var labelController = require('./server/controller/LabelController');
var ClassifyController = require('./server/controller/ClassifyController');

var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');
app.use("/",express.static(path.join(__dirname, 'app')));
//https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//httpSession mongodb
app.use(session({
  secret: 'foo',
  store: new MongoStore({
    // Basic usage
    host: '123.56.94.37', // Default, optional
    port: 27017, // Default, optional
    db: 'blog', // Required
    collection: 'sessions',
    //Basic authentication (optional)
    username: 'wangsiyuan',
    password: 'test123',

    // Advanced options (optional)
    autoReconnect: true, // Default
    w: 1, // Default,
    ssl: false // Default
  })
}));

app.use('/login', loginController);
app.use('/user', userController);
app.use('/article', articleController);
app.use('/label', labelController);
app.use('/classify', ClassifyController);

//blog-admin index
app.get('/index', function(req, res, next) {
  console.log(req.sessionID);
  console.log(req.session.userInfo);
  if(!req.session.userInfo) {
    res.redirect('login');
  } else {
    res.render('index');
  }
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});