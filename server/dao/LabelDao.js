'use strict';
var db = require("./util/dbUtil");
var mongoose = require('mongoose');

var labelSchema = new mongoose.Schema({
    name            : {type : String, default : '<div></div>'}, //label名
    article_num     : {type : Number, default: 0},//标签下文章的数量
    articles        : {type : [String]}//标签下的文章_id集合
});
/**
 * 新增一个标签
 * @param document
 * @param callback
 */
var save = function(document, callback) {
    var labelModel = db.model('blog_label', labelSchema);
    var labelEntity = new labelModel(document);
    labelEntity.save(function(error) {
        if(error) {
            console.log(error);
            callback({
                operate: false,
                msg: error
            })
        } else {
            console.log('saved OK!');
            callback({
                operate: true,
                msg: "操作成功"
            })
        }
    });
};
/**
 * 查询
 * @param callback {operate: boolean, msg: String, data: Object} operate当操作成功时返回true,否则为false。msg：当operate == false时，有值。data: 查出的数据
 * @param conditions {查询条件} {key: value} 键值对，键为字段，值是字段的内容
 * @param fields {查询字段} {String} example: 'UserName Email UserType' 要查询空格分隔的三个字段
 */
var query = function(callback, conditions, fields) {
    var articleModel = db.model('blog_article', articleSchema);
    var query;
    //如果有查询条件
    if(conditions) {
        query = articleModel.find(conditions);
    } else {
        query = articleModel.find({});
    }
    //如果规定查询字段
    if(fields) {
        query.select(fields);
    }

    query.exec(function(error, result) {
        if(error) {
            callback({
                operate: false,
                msg: error
            })
        } else {
            callback({
                operate: true,
                data: result
            });
        }
    })
};
/**
 * 根据articleId 查询
 * @param articleId
 * @param callback
 */
var queryById = function(articleId, callback) {
    var articleModel = db.model('blog_article', articleSchema);
    if(articleId) {
        articleModel.findById(articleId, function(error, result) {
            if(error) {
                console.log(error);
                callback({
                    operate: false,
                    msg: error
                })
            } else {
                callback({
                    operate: true,
                    data: result
                });
            }
        })
    }
};

var update = function(document, callback) {
    var articleModel = db.model('blog_article', articleSchema);
    var query = {_id: document._id};
    document['update_time'] = Date.now();
    articleModel.update(query, document, {}, function(error) {
        if(error) {
            callback({
                operate: false,
                msg: error
            })
        } else {
            callback({
                operate: true,
                msg: "操作成功"
            })
        }
    });
};

var del = function(articleId, callback) {
    var articleModel = db.model('blog_article', articleSchema);
    var query = articleModel.findById(articleId);
    query.remove(function(error, data) {
        if(error) {
            callback({
                operate: false,
                msg: error
            })
        } else {
            callback({
                operate: true,
                msg: "操作成功"
            })
        }
    })
};

module.exports.save = save;
module.exports.query = query;
module.exports.queryById = queryById;
module.exports.update = update;
module.exports.del = del;
