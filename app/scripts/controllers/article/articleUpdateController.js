'use strict';
define(['app'], function(app) {
    var articleUpdateController = function($scope, $http, $routeParams, $location, articleService) {
        var articleId = $routeParams.articleId;
        $scope.init = {
            types: [{
                name: '前端',
                id: '1'
            }, {
                name: "软件工程",
                id: '2'
            }]
        };

        var promise = articleService.getArticleById(articleId)
        promise.then(function(data) {
            console.log(data)
            $scope.article = data.data;
        });

        $scope.update = function() {
            var updatePromise = articleService.updateArticle($scope.article);
            updatePromise.then(function(data) {
                alert(data);
                $location.path('/article');
            })
        }
    };

    articleUpdateController.inject = ['$scope', '$http', '$routeParams', '$location','articleService'];
    app.register.controller("articleUpdateController", articleUpdateController);
});