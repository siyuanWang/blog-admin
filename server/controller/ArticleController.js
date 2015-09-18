'use strict';
var Q = require('q');
var express = require('express');
var articleDao = require('../dao/ArticleDao');
var labelDao = require('../dao/LabelDao');
var router = express.Router();
/**
 * 获得文章列表
 */
router.get('/', function(req, res) {
  articleDao.query().then(function(result) {
    res.send(result);
  }, function(error) {
    console.log(error);
    res.send([]);
  })
});
/**
 * 根据_id获得对应的文章
 */
router.get('/:id', function(req, res) {
  articleDao.queryById(req.params.id).then(function(result) {
    res.send(result);
  }, function(error) {
    console.log(error);
    //如果后台出错，默认给前端返回空对象
    res.send({});
  });
});
/**
 * 新增一个文章
 */
router.post('/', function(req, res) {
  var article = req.body;
  var labels = article.labels;
  var articleId;
  Q.fcall(function() {//保存文章 step1
    console.log("step1");
    articleDao.save(article).then(function(articleDocument){
      articleId = articleDocument.data._id;
      console.log("step1 done");
    }, function(error) {
      res.send(error);
      throw new Error('insert article error:' + error);
    })

  }).then(function() {//查询label,如果没有则新增一条label step2
    console.log("step2");
    var index = 1;
    for(var i = 0, length = labels.length; i < length; i++)  {
      labelDao.query({name: labels[i]}).then(function(data) {
        console.log("step2 loop "+index);
        index++;
      })
    }

    console.log("step2 done");

  }).then(function() {//往label中插入文章_id step3
    console.log("step3");
    //给每一个label.articleIds添加上articleId
    labelDao.addArticleIdByLabelName({name: {$in:labels}}, [articleId]).then(function(result) {
      console.log("step3 done");
      res.send(result);
    }, function(error) {
      console.log(error);
    });
  }).catch(function(error) {
    console.log(error);
  }).done();

  console.log("all done.")
});
/**
 * 修改文章
 */
router.put('/', function(req, res) {
  var data = req.body;
  console.log('update article data:', JSON.stringify(data));
  articleDao.updateNot$set(data).then(function(data) {
    res.send(data);
  }, function(error) {
    console.log(error);
    res.send('修改失败');
  });
});
/**
 * 删除文章
 */
router.delete('/:articleId', function(req, res) {
  var articleId = req.params.articleId;
  articleDao.del(articleId).then(function(data) {
    res.send(data);
  }, function(error) {
    console.log(error);
    res.send('删除失败')
  });
});
/**
 * 修改article.draft 1 草稿 2 已发布
 */
router.put('/draft/:articleId', function(req, res) {
  var articleId = req.params.articleId;
  var draft = req.body;
  articleDao.update$set({_id: articleId},draft).then(function(data) {
    res.send(data);
  }, function(error) {
    console.log(error);
    res.send('失败');
  })
});
module.exports = router;
