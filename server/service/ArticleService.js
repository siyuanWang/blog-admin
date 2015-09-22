'use strict';
var Q = require('q');
var express = require('express');
var articleDao = require('../dao/ArticleDao');
var labelDao = require('../dao/LabelDao');
var log4js = require('log4js');
var logger = log4js.getLogger();
var LABEL_INSERT_COMPLETE = false;//暂未考虑线程安全问题，由于Node的异步机制，逼不得已使用全局变量来判断状态
/**
 * 新增文章
 * @param article 文章对象
 */
function save(article) {
    var defer = Q.defer();
    var labels = article.labels;
    var articleId;
    articleDao.save(article).then(function(articleDocument){
        articleId = articleDocument._id;
        logger.debug("save article step 1 complete.");
    }, function(error) {
        logger.error("save article error:{}", error);
        defer.reject(error);
    }).then(function() {//step2:query label,if not exist,insert label
        try{
            _dealLabel(labels, 0, labels.length);
            logger.debug("save article step 2 complete.");
        }catch(error) {
            logger.error("save article error:{}", error);
            defer.reject(error);
        }
        //查询，没有则新增一条
    }).then(function() {//step3: push the article._id into label.articleIds
        var interval = setInterval(function() {
            if(LABEL_INSERT_COMPLETE) {
                //给每一个label.articleIds添加上articleId
                labelDao.addArticleIdByLabelName({label_name: {$in: labels}}, [articleId]).then(function (result) {
                    LABEL_INSERT_COMPLETE = false;
                    clearInterval(interval);

                    logger.debug("LABEL_INSERT_COMPLETE = " + LABEL_INSERT_COMPLETE);
                    logger.debug("save article step 3 complete.");
                    logger.debug("interval cleared.");
                    logger.info("save article complete.");
                    defer.resolve();
                }, function (error) {
                    logger.error("save article error:{}", error);
                    defer.reject(error);
                })
            }
        }, 1000);
    });
    return defer.promise;
}
/**
 * 删除文章
 * @param articleId
 */
function del(articleId) {
    var defer = Q.defer();
    articleDao.del(articleId).then(function(result) {
        logger.debug("del article, id:{}, deleted article:{}", articleId, result);
        defer.resolve(result);
    }, function(error) {
        logger.error("del article error:{}",error);
        defer.reject(error);
    });
    return defer.promise;
}
/**
 * 修改article.draft 1 草稿 2 已发布
 * @param articleId
 * @param draft
 */
function updateDraft(articleId, draft) {
    var defer = Q.defer();
    articleDao.update$set({_id: articleId},draft).then(function(result) {
        defer.resolve(result);
        logger.debug("update article.draft, id:{}, draft:{}, arguments:{}", articleId, draft, data);
    }, function(error) {
        logger.error("update article.draft error:{}",error);
        defer.reject(error);
    });
    return defer.promise;
}
/**
 * 修改文章
 * @param article
 */
function update(article) {
    var defer = Q.defer();
    logger.debug("update article object:{}", article);
    articleDao.updateNot$set(article).then(function(result) {
        defer.resolve(result);
        logger.debug("update article, arguments:{}", arguments);
    }, function(error) {
        logger.error("update article error:{}", error);
        defer.reject(error);
    });
    return defer.promise;
}

/**
 * 根据ariticleId获得文章对象
 * @param articleId
 */
function queryByArticleId(articleId) {
    var defer = Q.defer();
    logger.debug("queryByArticleId articleId:{}", articleId);
    articleDao.queryById(articleId).then(function(result) {
        defer.resolve(result);
    }, function(error) {
        logger.error("queryByArticleId error:{}",error);
        //如果后台出错，默认给前端返回空对象
        defer.reject(error);
    });
    return defer.promise;
}
/**
 * 获得文章列表
 */
function queryArticleList() {
    var defer = Q.defer();
    articleDao.query().then(function(result) {
        defer.resolve(result);
        logger.debug("articles length:{}", result.length);
    }, function(error) {
        logger.error(error);
        defer.reject(error);
    });
    return defer.promise;
}

/**
 * 递归，迭代所有labelNames,查询每个元素label,没有labels则新增一条
 * @param labelNames
 * @param index
 * @param length
 */
function _dealLabel(labelNames,index, length) {
    if(index == length)return;
    var queryPromise = queryLabel(labelNames[index]);
    queryPromise.then(function(data) {
        if(data.length === 0) {//没有label，插入一条
            var savePromise = saveLabel(labelNames[index]);
            savePromise.then(function(data) {
                index++;
                console.log("saved label:"+JSON.stringify(data));
                if(index < length) {
                    _dealLabel(labelNames, index, length);
                } else {
                    LABEL_INSERT_COMPLETE = true;
                }
            })
        } else {//有label的情况下
            index++;
            console.log("label exist, label:"+ data);
            if(index < length) {
                _dealLabel(labelNames, index, length);
            } else {
                LABEL_INSERT_COMPLETE = true;
            }
        }
    })
}

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

module.exports.save = save;
module.exports.del = del;
module.exports.updateDraft = updateDraft;
module.exports.update = update;
module.exports.queryByArticleId = queryByArticleId;
module.exports.queryArticleList = queryArticleList;

