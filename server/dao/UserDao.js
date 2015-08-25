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

var query = function(params, columns, callback) {
    var userModel = db.model('blog_user', userSchema);
    var query = userModel.find(params).select(columns);
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

module.exports.saveUser = saveUser;
module.exports.query = query;
