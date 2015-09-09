'use strict';
define(['app'], function(app) {
    var articleController = function($scope, $http, articleService, $window) {
        $scope.articles = [];
        var promise = articleService.getArticles();
        promise.then(function(data) {
            $scope.articles = data.data;
        });

        $scope.del = function(articleId) {
            if($window.confirm('是否删除文章？')) {
                var promise = articleService.del(articleId);
                promise.then(function(data) {
                    alert(data);
                    var articles = [];
                    angular.forEach($scope.articles, function(article, index) {
                        if(articleId != article._id) {
                            articles.push(article);
                        }
                    });
                    $scope.articles = articles;
                })
            }
        }

    };

    articleController.inject = ['$scope', '$http', 'articleService','$window'];
    app.register.controller("articleController", articleController);
});