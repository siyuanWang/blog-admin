'use strict';
var Q = require('q');
var express = require('express');
var articleDao = require('../dao/ArticleDao');
var labelDao = require('../dao/LabelDao');
var router = express.Router();
var LABEL_INSERT_COMPLETE = false;//暂未考虑线程安全问题
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

function queryLabel(labelName) {
  return labelDao.query({label_name: labelName}, undefined);
}

function saveLabel(labelName) {
  return labelDao.save({
    label_name: labelName,
    article_num: 0,
    articles: []
  });
}
/**
 * 递归，迭代所有labelNames,查询每个元素label,没有labels则新增一条
 * @param labelNames
 * @param index
 * @param length
 */
function dealLabel(labelNames,index, length) {
  if(index == length)return;
  var queryPromise = queryLabel(labelNames[index]);
  queryPromise.then(function(data) {
    if(data.length === 0) {//没有label，插入一条
        var savePromise = saveLabel(labelNames[index]);
        savePromise.then(function(data) {
          index++;
          console.log("saved label:"+JSON.stringify(data));
          if(index < length) {
            dealLabel(labelNames, index, length);
          } else {
            LABEL_INSERT_COMPLETE = true;
          }
        })
    } else {
      index++;
      console.log("label exist, label:"+ data);
      if(index < length) {
        dealLabel(labelNames, index, length);
      } else {
        LABEL_INSERT_COMPLETE = true;
      }
    }
  })
}

/**
 * 新增一个文章
 */
router.post('/', function(req, res) {
  var article = req.body;
  var labels = article.labels;
  var articleId;
  //step1: insert the article
  articleDao.save(article).then(function(articleDocument){
    articleId = articleDocument._id;
  }, function(error) {
    res.send(error);
    throw new Error('insert article error:' + error);
  }).then(function() {//step2:query label,if not exist,insert label
    dealLabel(labels, 0, labels.length);
    //查询，没有则新增一条
  }).then(function() {//step3: push the article._id into label.articleIds
    var interval = setInterval(function() {
      if(LABEL_INSERT_COMPLETE) {
        //给每一个label.articleIds添加上articleId
        labelDao.addArticleIdByLabelName({label_name: {$in: labels}}, [articleId]).then(function (result) {
          LABEL_INSERT_COMPLETE = false;
          console.log("LABEL_INSERT_COMPLETE = " + LABEL_INSERT_COMPLETE);
          clearInterval(interval);
          res.send(result);
        }, function (error) {
          console.log(error);
        })
      }

    }, 1000);

  });
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
