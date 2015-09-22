'use strict';
define(['app'], function(app) {
    var articleShowController = function($scope, $http, $routeParams, articleService, commentService) {
        var articleId = $routeParams.articleId;
        //获取文章对象，并数据绑定
        articleService.getArticleById(articleId).then(function(data) {
            $scope.article = data.result;
        });
    };
    articleShowController.inject = ['$scope', '$http', '$routeParams', 'articleService', 'commentService'];
    app.register.controller("articleShowController", articleShowController);
});