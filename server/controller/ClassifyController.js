'use strict';
var express = require('express');
var classifyService = require("../service/ClassifyService");
var httpResUtil = require('../util/HttpResUtil');

var router = express.Router();
/**
 * 获得classify集合
 */
router.get('/', function(req, res) {
    var promise = classifyService.queryList();
    promise.then(function(result) {
        res.send(httpResUtil.successWithResult(result));
    }, function(error) {
        res.send(httpResUtil.errorWithResult({}));
    })
});
/**
 * 获得pid下的classify集合
 */
router.get('/:pid', function(req, res) {
    var pid = req.params.pid;
    var promise = classifyService.queryByParentId(pid);
    promise.then(function(result) {
        res.send(httpResUtil.successWithResult(result));
    }, function(error) {
        res.send(httpResUtil.errorWithResult({}))
    });
});
/**
 * 新增一条document
 */
router.post('/', function(req, res) {
    var promise = classifyService.save(req.body);
    promise.then(function(result) {
        res.send(httpResUtil.successWithResult('新增成功'));
    }, function(error) {
        res.send(httpResUtil.errorWithResult({}))
    });
});
module.exports = router;
