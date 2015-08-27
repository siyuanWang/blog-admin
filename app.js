var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var loginController = require('./server/controller/LoginController');
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');
app.use("/",express.static(path.join(__dirname, 'app')));
//ÖÐ¼ä¼þ£¬https://github.com/expressjs/body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/login", loginController);

//blog-admin index
app.get('/index', function(req, res) {
  console.log('render index page.');
  res.render('index');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});