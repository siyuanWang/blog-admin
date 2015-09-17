'use strict';
var db = require("./util/dbUtil");
var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    content         : {type : String, default : '<div></div>'},
    title           : {type : String, default: '未命名标题'},
    labels          : {type : [String], default: []},
    introduction    : {type :  String, default: '<div></div>'},
    type            : {type : Number, default: 1},
    share_num       : {type : Number, default: 0},
    create_time     : {type : Date, default: Date.now()},
    update_time     : {type : Date, default: Date.now()},
    draft           : {type : Number, default: 1}           //默认是 1草稿,发布是2
});

var save = function(document, callback) {
    var articleModel = db.model('blog_article', articleSchema);
    var articleEntity = new articleModel(document);
    articleEntity.save(function(error) {
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
 * @param skip {跳过查询}
 */
var query = function(callback, conditions, fields, skip) {
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
    //query.limit(10);
    //query.skip(skip);
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
/**
 * 修改 非$set(数据覆盖)
 * @param document
 * @param callback
 */
var updateNot$set = function(document, callback) {
    var articleModel = db.model('blog_article', articleSchema);
    var query = {_id: document._id};
    console.log("query:", JSON.stringify(query));
    document['update_time'] = Date.now();
    articleModel.update(query, document, {}, function(error) {
        console.log(arguments)
        if(error) {
            console.log(error);
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
/**
 *
 * @param query 检索条件
 * @param document $set 的对象（替换字段值）
 * @param callback
 */
var update$set = function(query, document, callback) {
    var articleModel = db.model('blog_article', articleSchema);
    document['update_time'] = Date.now();
    console.log("query:" + JSON.stringify(query));
    console.log("document:" + JSON.stringify(document));
    query._id = mongoose.Types.ObjectId(query._id);
    articleModel.update(query, {$set: document}, function(error) {
        if(error) {
            console.log(error);
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
module.exports.updateNot$set = updateNot$set;
module.exports.update$set = update$set;
module.exports.del = del;
