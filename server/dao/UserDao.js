'use strict';
var db = require("./util/dbUtil");
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username        : {type : String, default : '用户名'},
    password        : {type : String},
    email           : {type : String},
    sex             : {type : Number},
    create_time     : {type : Date, default: Date.now()},
    update_time     : {type : Date, default: Date.now()},
    phone           : {type : String},
    age             : {type : Number}
},{ versionKey: false });

var saveUser = function(document, callback) {
    var userModel = db.model('blog_user', userSchema);
    var userEntity = new userModel(document);
    userEntity.save(function(error) {
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

var query = function(conditions, fields, callback) {
    var userModel = db.model('blog_user', userSchema);
    var query = userModel.find(conditions).select(fields);
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
    });
};

var queryById = function(id, fields, callback) {
    var userModel = db.model('blog_user', userSchema);
    if(id) {
        var query = userModel.findById(id);
        query.select(fields);
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
    }
};

var update = function(document, callback) {
    var userModel = db.model('blog_user', userSchema);
    var query = {_id: document._id};
    document['update_time'] = Date.now();
    userModel.update(query, document, {}, function(error) {
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

var del = function(userId, callback) {
    var userModel = db.model('blog_user', userSchema);
    var query = userModel.findById(userId);
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

module.exports.saveUser = saveUser;
module.exports.query = query;
module.exports.update = update;
module.exports.queryById = queryById;
module.exports.del = del;
