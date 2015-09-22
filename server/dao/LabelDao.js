'use strict';
var db = require("./util/dbUtil");
var mongoose = require('mongoose');
var Q = require('q');

var labelSchema = new mongoose.Schema({
    label_name      : {type : String}, //label名
    article_num     : {type : Number, default: 0},//标签下文章的数量
    articles        : {type : [String], default: []}//标签下的文章_id集合
});
/**
 * 新增一个标签
 * @param document
 */
var save = function(document) {
    var defered = Q.defer();
    var labelModel = db.model('blog_label', labelSchema);
    var labelEntity = new labelModel(document);
    labelEntity.save(function(error, data) {
        if(error) {
            defered.reject(error);
        } else {
            defered.resolve(data);
        }
    });

    return defered.promise;
};
/**
 * 查询
 * @param conditions 查询条件 键值对，键为字段，值是字段的内容
 * @param fields 查询字段 String example: 'UserName Email UserType' 要查询空格分隔的三个字段
 * @param pagination skip,limit
 */
var query = function(conditions, fields, pagination) {
    var defered = Q.defer();
    var labelModel = db.model('blog_label', labelSchema);
    var query;
    //如果有查询条件
    if(conditions) {
        query = labelModel.find(conditions);
    } else {
        query = labelModel.find({});
    }
    //如果规定查询字段
    if(fields) {
        query.select(fields);
    }
    if(pagination.skip) {
        query.skip(pagination.skip);
    }
    if(pagination.limit) {
        query.limit(pagination.limit)
    }
    query.exec(function(error, result) {
        if(error) {
            defered.reject(error);
        } else {
            defered.resolve(result);
        }
    });

    return defered.promise;
};
/**
 * 修改标签
 * @param document
 */
var updateNot$set = function(document) {
    var defered = Q.defer();
    var labelModel = db.model('blog_label', labelSchema);
    var query = {_id: document._id};
    document['update_time'] = Date.now();
    labelModel.update(query, document, {}, function(error, data) {
        console.log(arguments);
        if(error) {
            defered.reject(error);
        } else {
            defered.resolve(data);
        }
    });

    return defered.promise;
};
/**
 *
 * @param query 查询条件
 * @param articleIds 要插入的文章ID
 *
 * bug:
 * 1、第一次插入的时候，push不进去articleId,第二次，才能push进去。
 */
var addArticleIdByLabelName = function(query, articleIds) {
    var defered = Q.defer();
    var labelModel = db.model('blog_label', labelSchema);
    console.log(query);
    labelModel.update(query, {$push: {articles: {$each: articleIds}}},{multi:true}, function(error, data) {
        if(error) {
            console.log("addArticleIdByLabelName is error:", error);
            defered.reject(error);
        } else {
            defered.resolve(data)
        }
    });

    return defered.promise;
};
/**
 * 获得记录总数
 * @returns {*}
 */
function getCount() {
    var defered = Q.defer();
    var labelModel = db.model('blog_label', labelSchema);
    var query = labelModel.find({}).count();
    query.exec(function(error, result) {
        if(error) {
            defered.reject(error);
        } else {
            defered.resolve(result);
        }
    });

    return defered.promise;
}

module.exports.save = save;
module.exports.query = query;
module.exports.updateNot$set = updateNot$set;
module.exports.addArticleIdByLabelName = addArticleIdByLabelName;
module.exports.getCount = getCount;
