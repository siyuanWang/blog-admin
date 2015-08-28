'use strict';
define(['app'], function(app) {
    app.filter('userFilter', function() {
        return function(users){
            angular.forEach(users, function(user, index) {
                if(user.sex == '0') {
                    user.sex = '男';
                } else if(user.sex == '1') {
                    user.sex = '女';
                }
            });

            return users;
        }
    });
});
