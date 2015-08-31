'use strict';
define(['app'], function(app) {
    var articleController = function($scope, $http, articleService) {
        $scope.articles = [];
        var promise = articleService.getArticles();
        promise.then(function(data) {
            $scope.articles = data.data;
        });
    };

    articleController.inject = ['$scope', '$http', 'articleService'];
    app.register.controller("articleController", articleController);
});