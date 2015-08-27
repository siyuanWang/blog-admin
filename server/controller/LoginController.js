'use strict';
var express = require('express');
var userDao = require('../dao/UserDao');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('login', { msg: 'The index page!' })
});

router.post('/', function(req, res) {
    var params = req.body;
    var columns = {username:1, password:1};
    var returnStr = '用户名或密码错误.';
    console.log(params)
    userDao.query({username: params.username}, columns, function(data) {
        if(data.operate) {
            var userInfo = data.data;
            if(userInfo.length > 0 && userInfo[0].password === params.password) {
                res.redirect('index')
            } else {
                res.render('login', { msg: returnStr })
            }
        } else {
            res.render('index/login', { msg: '后台程序错误' })
        }
    });
});


module.exports = router;
