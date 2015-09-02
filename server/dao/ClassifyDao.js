'use strict';
var db = require("./util/dbUtil");
var mongoose = require('mongoose');

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
 * @param callback
 */
var save = function(document, callback) {
    var classifyModel = db.model('blog_classify', classifySchema);
    var classifyEntity = new classifyModel(document);
    classifyEntity.save(function(error) {
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
 * 根据ID进行查询
 * @param id
 * @param callback
 */
var queryById = function(id, callback) {
    var classifyModel = db.model('blog_classify', classifySchema);
    if(id) {
        classifyModel.findById(id, function(error, result) {
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
    } else {
        throw new Error('ID is undefined or null or ""');
    }
};
/**
 * 查询pid下的所有类型
 * @param pid 根据pid进行查询
 * @param callback 回调函数
 */
var queryByParantId = function(pid, callback) {
    var classifyModel = db.model('blog_classify', classifySchema);
    if(pid) {
        classifyModel.count({pid: pid}, function(error, count) {
            if(error) {
                throw new Error(error);
            } else {
                callback(0);

            }
        })
    } else {
        throw new Error('ID is undefined or null or ""');
    }
};

module.exports.save = save;
module.exports.query = query;
module.exports.queryById = queryById;
module.exports.queryByParantId = queryByParantId;
