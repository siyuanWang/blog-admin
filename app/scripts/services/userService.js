'use strict';
define(['app'], function(app) {
    app.factory('userService', ['$http', '$q', function($http, $q) {

        var save = function(user) {

        };

        return {
            save: save

        }
    }]);
});
