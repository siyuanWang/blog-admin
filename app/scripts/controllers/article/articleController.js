'use strict';
define(['app'], function(app) {
    var articleController = function($scope, $http, articleService, $window) {
        $scope.articles = [];
        var promise = articleService.getArticles();
        promise.then(function(data) {
            $scope.articles = data;
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
        };
        //发布文章
        $scope.publish = function(articleId) {
            if($window.confirm('是否发布文章？')) {
                var promise = articleService.updateDraft(articleId, 2);
                promise.then(function(data) {
                    if(data.operate) {
                        alert(data.msg);
                        angular.forEach($scope.articles, function(article, index) {
                            if(article._id == articleId) {
                                //发布
                                article.draft = 2;
                            }
                        });
                    } else {
                        alert(data.msg.message)
                    }

                })
            }
        };
        //下线文章，变成草稿
        $scope.downLine = function(articleId) {
            if($window.confirm('是否下线文章？')) {
                var promise = articleService.updateDraft(articleId, 1);
                promise.then(function(data) {
                    if(data.operate) {
                        alert(data.msg);
                        angular.forEach($scope.articles, function(article, index) {
                            if(article._id == articleId) {
                                //发布
                                article.draft = 1;
                            }
                        });
                    } else {
                        alert(data.msg.message)
                    }
                })
            }
        };

        function getArticleById(articleId) {
            var returnArticle = null;
            angular.forEach($scope.articles, function(article, index) {
                if(articleId != article._id) {
                    //草稿
                    returnArticle = article;
                    return false;
                }
            });

            return returnArticle;
        }
    };

    articleController.inject = ['$scope', '$http', 'articleService','$window'];
    app.register.controller("articleController", articleController);
});