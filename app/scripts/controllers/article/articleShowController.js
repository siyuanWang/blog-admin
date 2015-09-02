'use strict';
define(['app'], function(app) {
    var articleShowController = function($scope, $http, $routeParams, articleService, commentService) {
        var articleId = $routeParams.articleId;
        $scope.defaultImg = '/images/icon.jpg';
        $scope.article = {};//文章对象
        $scope.comments = [];//评论集合
        $scope.comment = {
            content: '',
            parentId: 0,
            parentOrder: 1,
            articleId: articleId
        };

        //获取文章对象，并数据绑定
        articleService.getArticleById(articleId).then(function(data) {
            $scope.article = data.data;
        });
        var initComments = function() {
            //获取评论对象集合，并数据绑定
            commentService.getCommentsByArticleId(articleId).then(function(data) {
                $scope.comments = data.data;
            });
        };
        initComments();
        //保存一个评论
        $scope.saveComment = function() {
            commentService.save($scope.comment).then(function(msg) {
                $scope.comment.content = '';
                initComments();
            }, function() {

            }, function() {

            });
        }
    };
    articleShowController.inject = ['$scope', '$http', '$routeParams', 'articleService', 'commentService'];
    app.register.controller("articleShowController", articleShowController);
});