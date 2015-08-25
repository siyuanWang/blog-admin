'use strict';
define(['app'], function(app) {
    var controller = function($scope, commentService) {
        $scope.comment = {
           content: "",
           parentId: "",
           parentOrder: null
        };
        $scope.articleId = '';
        console.log($scope);
        //增加一个评论
        $scope.add = function() {
            var promise = commentService.add(comment);
            promise.then(function(msg) {
                alert(msg);
            }, function(reason) {
                alert('Failed: ' + reason);
            }, function(msg) {
                console.log('process:'+msg)
            });
        };

        //查询ArticleId下的评论，暂不做分页
        $scope.queryComments = function() {
            var promise = commentService.getCommentsByArticleId(articleId);
            promise.then(function(msg) {
                alert(msg);
            }, function(reason) {
                alert('Failed: ' + reason);
            }, function(msg) {
                console.log('process:'+msg)
            });
        }


    };
    controller.inject = ['$scope','commentService'];
    app.register.controller('commentController', controller);
});
