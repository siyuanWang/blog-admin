'use strict';
var Q = require('q');
var labelDao = require('../dao/LabelDao');
var articleDao = require('../dao/ArticleDao');
var log4js = require('log4js');
var logger = log4js.getLogger();
/**
 * 分页查询所有的标签，每页20个
 * @param pagination pagination<page, rows, count> 当前页面，总记录数，每页显示数量
 */
function queryList(pagination) {
    var defer = Q.defer();
    var page = parseInt(pagination.page, 10), rows = parseInt(pagination.rows,10), count = parseInt(pagination.count, 10);
    var skip = (page-1)*count;
    var limit = count;
    var callbackData = {};
    labelDao.query({}, undefined, {skip: skip, limit: limit}).then(function(result) {
        logger.debug("query Labels, skip: {}, limit: {}", skip, limit);
        callbackData.list = result;
    }, function(error) {
        logger.error("query Labels error:{}", error);
        defer.reject(error);
    }).then(function() {
        labelDao.getCount().then(function(result) {
            logger.debug("label count:{}", result);
            callbackData.count = count;
            callbackData.page = page;
            callbackData.rows = result;
            logger.debug("callback data:{}", callbackData);
            defer.resolve(callbackData);
        }, function(error) {
            logger.error("query Labels error:{}", error);
            defer.reject(error);
        })
    });
    return defer.promise;
}
/**
 * 根据labelId,查询出所有的Article对象
 * @param labelId
 */
function queryArticleByLabelId(labelId) {
    var defer = Q.defer();
    labelDao.query({_id: labelId}, undefined).then(function(result) {
        var articles = result.articles;
        logger.debug("articles:{}", articles);
        articleDao.query({_id:{$in: articles}}, undefined).then(function(result){
            logger.debug(result);
            defer.resolve(result);
        }, function(error) {
            logger.error("queryArticleByLabelId error:{}", error);
            defer.reject(error);
        });
    }, function(error) {
        logger.error("queryArticleByLabelId error:{}", error);
        defer.reject(error);
    });
    return defer.promise;
}

module.exports.queryList = queryList;
module.exports.queryArticleByLabelId = queryArticleByLabelId;
