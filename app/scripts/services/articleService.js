'use strict';
define(['app'], function(app) {
    app.factory('articleService', ['$http','$q', function($http, $q) {
        var article = {
            title: "",
            introduction: "",
            labels: "",
            content: ""
        };

        var setArticle = function(obj) {
            article = obj;
        };
        //获得文章列表
        var getArticles = function() {
            var defer = $q.defer();
            $http.get('/article')
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(response, status, headers, config) {
                    defer.reject(response);
                });
            return defer.promise;
        };
        //根据ArticleId获得文章的详细资料
        var getArticleById = function(id) {
            var defer = $q.defer();
            $http.get('/article/'+id)
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(response, status, headers, config) {
                    defer.reject(response);
                });
            return defer.promise;
        };

        var updateArticle = function(article) {
            var defer = $q.defer();
            $http.put('/article', article)
                .success(function(data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function(response, status, headers, config) {
                    defer.reject(response);
                });

            return defer.promise;
        };

        return {
            setArticle: setArticle,
            getArticles: getArticles,
            getArticleById: getArticleById,
            updateArticle: updateArticle
        }
    }]);
});