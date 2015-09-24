'use strict';
var db = require("./util/dbUtil");
var mongoose = require('mongoose');
var Q = require('q');

var classifySchema = new mongoose.Schema({
    name            : {type : String},                          //分类名称
    code            : {type : String, default : '<div></div>'}, //分类code
    parentId        : {type : String, default: ''},             //分类pid
    order           : {type : Number, default: 1},              //分类排列顺序
    create_time     : {type : Date, default: Date.now()}        //分类创建时间
});
/**
 * 新增一个类型
 * @param document
 */
var save = function(document) {
    var defer = Q.defer();
    var classifyModel = db.model('blog_classify', classifySchema);
    var classifyEntity = new classifyModel(document);
    classifyEntity.save(function(error, document) {
        if(error) {
            defer.reject(error);
        } else {
            defer.resolve(document);
        }
    });
    return defer.promise;
};
/**
 * 查询
 * @param conditions {Object} 键值对，键为字段，值是字段的内容
 * @param fields {String|| undefined} example: 'UserName Email UserType' 要查询空格分隔的三个字段
 */
var query = function(conditions, fields) {
    var defer = Q.defer();
    var classifyModel = db.model('blog_classify', classifySchema);
    var query;
    //如果有查询条件
    if(conditions) {
        query = classifyModel.find(conditions);
    } else {
        query = classifyModel.find({});
    }
    //如果规定查询字段
    if(fields) {
        query.select(fields);
    }
    query.exec(function(error, result) {
        if(error) {
            defer.reject(error);
        } else {
            defer.resolve(result);
        }
    });
    return defer.promise;
};
/**
 * 根据ID进行查询
 * @param id
 */
var queryById = function(id) {
    var defer = Q.defer();
    var classifyModel = db.model('blog_classify', classifySchema);
    if(id) {
        classifyModel.findById(id, function(error, result) {
            if(error) {
                defer.reject(error);
            } else {
                defer.resolve(result);
            }
        })
    } else {
        throw new Error('ID is undefined or null or ""');
    }

    return defer.promise;
};

module.exports.save = save;
module.exports.query = query;
module.exports.queryById = queryById;
