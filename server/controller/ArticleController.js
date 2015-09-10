'use strict';
var express = require('express');
var articleDao = require('../dao/ArticleDao');
var router = express.Router();
/**
 * 获得文章列表
 */
router.get('/', function(req, res) {
  articleDao.query(function(result) {
    res.send(result);
  });

});
/**
 * 根据_id获得对应的文章
 */
router.get('/:id', function(req, res) {
  articleDao.queryById(req.params.id, function(result) {
    res.send(result);
  });
});
/**
 * 新增一个文章
 */
router.post('/', function(req, res) {
  var data = req.body;
  articleDao.save(data, function(data){
    res.send(data.msg);
  })
});
/**
 * 修改文章
 */
router.put('/', function(req, res) {
  var data = req.body;
  console.log('update article data:', JSON.stringify(data));
  articleDao.updateNot$set(data, function(data) {
    res.send(data);
  });
});
/**
 * 删除文章
 */
router.delete('/:articleId', function(req, res) {
  var articleId = req.params.articleId;
  console.log(articleId)
  articleDao.del(articleId, function(data) {
    res.send(data.msg);
  });
});
/**
 * 修改article.draft 1 草稿 2 已发布
 */
router.put('/draft/:articleId', function(req, res) {
  var articleId = req.params.articleId;
  var draft = req.body;

  console.log(articleId)
  console.log(draft);
  articleDao.update$set({_id: articleId},draft, function(data) {
    res.send(data);
  })
});
module.exports = router;
