var express = require('express');
var path = require('path');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'html');
app.use("/",express.static(path.join(__dirname, 'app')));


app.get('/login', function (req, res) {
  res.render('index/login',{ title: 'ejs' });
});

var server = app.listen(3000, function () {
var host = server.address().address;
var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});