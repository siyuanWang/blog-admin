'use strict';
var express = require('express');
var userDao = require('../dao/UserDao');
var router = express.Router();

router.get('/', function(req, res) {
    console.log('1111')
    res.render('index/login', { title: 'The index page!' })
});

router.post('/', function(req, res) {
    var params = req.body;
    var columns = {username:1, password:1};
    userDao.query({username: params.username}, columns, function(data) {
        if(data.operate) {
            var userInfo = data.data;
            console.log(req.session)
            if(userInfo.length > 0 && userInfo[0].password === params.password) {
                req.session.userInfo = userInfo;
                res.send({check: true});
            } else {
                res.send({check: false, msg: "密码或用户名错误"});
            }
        } else {
            console.log(data.msg);
        }
    });
});


module.exports = router;
