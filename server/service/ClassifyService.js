'use strict';
var Q = require('q');
var classifyDao = require('../dao/ClassifyDao');
var log4js = require('log4js');
var logger = log4js.getLogger();
/**
 * 查询所有的
 */
function queryList() {
    var defer = Q.defer();
    classifyDao.query({}, undefined).then(function(result) {
        defer.resolve(result);
    }, function(error) {
        logger.error("classify queryList error: {}", error);
        defer.reject(error);
    });
    return defer.promise;
}
/**
 * 根据pid查询
 * @param pid
 */
function queryByParentId(pid) {
    var defer = Q.defer();
    classifyDao.query({pid: pid}, undefined).then(function(result) {
        defer.resolve(result);
    }, function(error) {
        logger.error("classify queryByParentId error: {}", error);
        defer.reject(error);
    });
    return defer;
}
/**
 * 保存一个classify
 * @param document
 */
function save(document) {
    var defer = Q.defer();
    classifyDao.save(document).then(function(result) {
        defer.resolve(result);
    }, function(error) {
        logger.error("classify save error: {}", error);
        defer.reject(error);
    });
    return defer.promise;
}

module.exports.queryList = queryList;
module.exports.queryByParentId = queryByParentId;
module.exports.save = save;
