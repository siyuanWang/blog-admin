'use strict';
var express = require('express');
var labelService = require("../service/LabelService");
var httpResUtil = require('../util/HttpResUtil');

var router = express.Router();
/**
 * 获得标签集合
 */
router.get('/', function(req, res) {
    var pagination = req.query;
    var promise = labelService.queryList(pagination);
    promise.then(function(result) {
        res.send(httpResUtil.successWithResult(result));
    }, function(error) {
        res.send(httpResUtil.errorWithResult({}));
    })
});
/**
 * 获得标签集合下的文章列表
 */
router.get('/:articleId', function(req, res) {
    var promise = labelService.queryArticleByLabelId(articleId);
    promise.then(function(result) {
        res.send(httpResUtil.successWithResult(result));
    }, function(error) {
        res.send(httpResUtil.errorWithResult({}))
    });
});

module.exports = router;
