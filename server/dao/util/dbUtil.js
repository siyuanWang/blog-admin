var mongoose = require('mongoose'),
    config = require('../../../db.json');
module.exports = (function(){
    var host = config.host,
        port = config.port,
        dbName = config.dbname,
        userName = config.username,
        password = config.password;
    var mongoUrl;
    if(userName && password) {
        mongoUrl = 'mongodb://' + userName + ':' + password + '@' + host +':' + port+ '/' + dbName;
    } else {
        mongoUrl = 'mongodb://' + host +':' + port+ '/' + dbName;
    }
    var options = {
        server: {
            auto_reconnect: true,
            poolSize: 5
        }
    };

    mongoose.connect(mongoUrl, options, function(err) {
        if(err) {
            console.log('[mongoose log] Error connecting to: ' + mongoUrl + '. ' + err);
        } else {
            console.log('[mongoose log] Successfully connected to: ' + mongoUrl);
        }
    });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'mongoose connection error:'));
    db.once('open', function callback () {
        console.log('mongoose open success');
    });

    return db;
})();