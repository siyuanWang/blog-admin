'use strict';
var db = require("./util/dbUtil");
var mongoose = require('mongoose');
var Q = require('q');

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

var save = function(document) {
    var defered = Q.defer();
    var articleModel = db.model('blog_article', articleSchema);
    var articleEntity = new articleModel(document);
    articleEntity.save(function(error, data) {
        console.log(data);
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
 * @param conditions 键值对，键为字段，值是字段的内容
 * @param fields example: 'UserName Email UserType' 要查询空格分隔的三个字段
 * @pagination pagination skip,limit
 */
var query = function(conditions, fields, pagination) {
    var defered = Q.defer();
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
    if(pagination && pagination.skip) {
        query.skip(pagination.skip);
    }
    if(pagination && pagination.limit) {
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
 * 根据articleId 查询
 * @param articleId
 */
var queryById = function(articleId) {
    var defered = Q.defer();
    var articleModel = db.model('blog_article', articleSchema);
    if(articleId) {
        articleModel.findById(articleId, function(error, result) {
            if(error) {
                defered.reject(error);
            } else {
                defered.resolve(result);
            }
        })
    }

    return defered.promise;
};
/**
 * 修改 非$set(数据覆盖)
 * @param document
 */
var updateNot$set = function(document) {
    var defered = Q.defer();
    var articleModel = db.model('blog_article', articleSchema);
    var query = {_id: document._id};
    document['update_time'] = Date.now();
    articleModel.update(query, document, {}, function(error, result) {
        if(error) {
            defered.reject(error);
        } else {
            defered.resolve(result);
        }
    });

    return defered.promise;
};
/**
 *
 * @param query 检索条件
 * @param document $set 的对象（替换字段值）
 */
var update$set = function(query, document) {
    var defered = Q.defer();
    var articleModel = db.model('blog_article', articleSchema);
    document['update_time'] = Date.now();
    console.log("query:" + JSON.stringify(query));
    console.log("document:" + JSON.stringify(document));
    query._id = mongoose.Types.ObjectId(query._id);
    articleModel.update(query, {$set: document}, function(error, result) {
        if(error) {
            defered.reject(error);
        } else {
            defered.resolve(result);
        }
    });

    return defered.promise;
};

var del = function(articleId) {
    var defered = Q.defer();
    var articleModel = db.model('blog_article', articleSchema);
    var query = articleModel.findById(articleId);
    query.remove(function(error, result) {
        if(error) {
            defered.reject(error);
        } else {
            defered.resolve(result);
        }
    });
    return defered.promise;
};

module.exports.save = save;
module.exports.query = query;
module.exports.queryById = queryById;
module.exports.updateNot$set = updateNot$set;
module.exports.update$set = update$set;
module.exports.del = del;
