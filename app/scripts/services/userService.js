'use strict';
define(['app'], function(app) {
    app.factory('userService', ['$http', '$q', function($http, $q) {
        /**
         * 新增
         * @param user
         * @returns {*}
         */
        var save = function(user) {
            var defer = $q.defer();
            $http.post('/user', user)
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(response, status, headers, config) {
                    defer.reject(response);
                });

            return defer.promise();
        };

        /**
         * 查询用户
         * @param condition 查询条件{page: <number>当前页, row: <number>每页显示数量}
         * @returns {*}
         */
        var query = function(condition) {
            var defer = $q.defer();
            $http.get('/user', condition)
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(response, status, headers, config) {
                    defer.reject(response);
                });

            return defer.promise;
        };
        /**
         * 按ID查询用户
         * @param userId
         * @returns {*}
         */
        var queryById = function(userId) {
            var defer = $q.defer();
            $http.get('/user/'+userId)
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(response, status, headers, config) {
                    defer.reject(response);
                });

            return defer.promise;
        };

        var update = function(user) {
            var defer = $q.defer();
            $http.put('/user', user)
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(response, status, headers, config) {
                    defer.reject(response);
                });

            return defer.promise;
        };

        return {
            save: save,
            query: query,
            queryById: queryById,
            update: update
        }
    }]);
});
