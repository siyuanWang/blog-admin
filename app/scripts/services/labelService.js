'use strict';
define(['app'], function(app) {
    app.factory('labelService', ['$http','$q', function($http, $q) {

        function queryLabels(pagination) {
            var defer = $q.defer();
            $http.get('/label',{params: pagination})
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(response, status, headers, config) {
                    defer.reject(response);
                });
            return defer.promise;
        }

        function getLabelArticlesByLabelId(labelId, pagination) {
            var defer = $q.defer();
            $http.get('/label/'+labelId,{params: pagination})
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(response, status, headers, config) {
                    defer.reject(response);
                });
            return defer.promise;
        }

        return {
            queryLabels: queryLabels,
            getLabelArticlesByLabelId: getLabelArticlesByLabelId
        }
    }]);
});