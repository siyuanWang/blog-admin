'use strict';
define(['app'], function(app) {
    app.factory('classifyService', ['$http','$q', function($http, $q) {

        function queryList() {
            var defer = $q.defer();
            $http.get('/classify')
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(response, status, headers, config) {
                    defer.reject(response);
                });
            return defer.promise;
        }

        function save(document) {
            var defer = $q.defer();
            console.log(document)
            $http.post('/classify', document)
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(response, status, headers, config) {
                    defer.reject(response);
                });
            return defer.promise;
        }

        return {
            queryList: queryList,
            save: save
        }
    }]);
});