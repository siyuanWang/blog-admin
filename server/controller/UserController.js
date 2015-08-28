'use strict';
var express = require('express');
var userDao = require('../dao/UserDao');
var router = express.Router();

/**
 * 校验用户名重复
 */
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
/**
 * 新增用户
 */
router.post('/', function(req, res) {
  var data = req.body;
  delete data.confirmPassword;
  userDao.saveUser(data, function(data) {
    res.send(data.msg);
  });
});

router.get('/', function(req, res) {
  var conditions = req.params;
  console.log('query user conditions:'+JSON.stringify(conditions));
  var fields = {username: 1, email: 1, sex: 1, phone: 1, age: 1, create_time: 1};
  userDao.query({}, fields, function(data) {
    res.send(data.data);
  })
});

module.exports = router;
