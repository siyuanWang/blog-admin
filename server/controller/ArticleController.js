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
  articleDao.update(data, function(data) {
    res.send(data.msg);
  });
});

module.exports = router;
