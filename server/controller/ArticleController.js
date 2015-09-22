'use strict';
var Q = require('q');
var express = require('express');
var articleService = require('../service/ArticleService');
var httpResUtil = require('../util/HttpResUtil');
var router = express.Router();
/**
 * 获得文章列表
 */
router.get('/', function(req, res) {
  var promise = articleService.queryArticleList();
  promise.then(function(result) {
    res.send(httpResUtil.successWithResult(result));
  }, function(error) {
    res.send(httpResUtil.errorWithResult({}));
  });
});
/**
 * 根据_id获得对应的文章
 */
router.get('/:id', function(req, res) {
  var promise = articleService.queryByArticleId(req.params.id);
  promise.then(function(result) {
    res.send(httpResUtil.successWithResult(result));
  }, function(error) {
    res.send(httpResUtil.errorWithResult({}));
  });
});

/**
 * 新增一个文章
 */
router.post('/', function(req, res) {
  var promise = articleService.save(req.body);
  promise.then(function(result) {
    res.send(httpResUtil.success('新增成功'));
  }, function(error) {
    res.send(httpResUtil.error('新增失败'));
  })
});
/**
 * 修改文章
 */
router.put('/', function(req, res) {
  var promise = articleService.update(req.body);
  promise.then(function(result) {
    res.send(httpResUtil.success('修改成功'));
  }, function(error) {
    res.send(httpResUtil.error('修改失败'));
  });
});
/**
 * 删除文章
 */
router.delete('/:articleId', function(req, res) {
  var promise = articleService.del(req.params.articleId);
  promise.then(function(result) {
    res.send(httpResUtil.success('删除成功'));
  }, function(error) {
    res.send(httpResUtil.error('删除失败'));
  });
});
/**
 * 修改article.draft 1 草稿 2 已发布
 */
router.put('/draft/:articleId', function(req, res) {
  var articleId = req.params.articleId;
  var draft = req.body;
  var promise = articleService.updateDraft(articleId, draft);
  promise.then(function(result) {
    res.send(httpResUtil.success('操作成功'));
  }, function(error) {
    res.send(httpResUtil.error('操作失败'));
  });
});

module.exports = router;
