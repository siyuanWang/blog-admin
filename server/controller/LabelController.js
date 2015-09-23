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
router.get('/:labelId', function(req, res) {
    var pagination = req.query;
    var labelId = req.params.labelId;
    var promise = labelService.queryArticleByLabelId(labelId, pagination);
    promise.then(function(result) {
        res.send(httpResUtil.successWithResult(result));
    }, function(error) {
        res.send(httpResUtil.errorWithResult({}))
    });
});

module.exports = router;
