'use strict';
var express = require('express');
var userDao = require('../dao/UserDao');
var router = express.Router();

router.get('/page/add', function(req, res) {
  res.render('views/user/add');
});

router.get('/page/list', function(req, res) {
  res.render('views/user/list');
});

router.get('/checkusername', function(req, res) {
  var params = req.query;
  var columns = {username:1, create_time:1};
  userDao.query(params, columns, function(data) {
    if(data.operate) {
      console.log(data.data);
      res.send(data.data[0])
    } else {
      console.log(data.msg);
    }
  });
});

router.post('/', function(req, res) {
  var data = req.body;
  delete data.confirmPassword;
  userDao.saveUser(data, function(data) {
    res.send(data.msg);
  });
});

module.exports = router;
