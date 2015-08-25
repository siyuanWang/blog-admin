'use strict';
define(['app'], function(app) {
    var controller = function($scope, $timeout, articleService) {
        articleService.getArticles().then(function(data) {
            $scope.articles = data.data;
        });
        $scope.labels = ['javaScript','HTML','Css','Java','AngularJs','bootstrap','AMD','响应式','Unit Test','前端']
    };
    controller.inject = ['$scope', '$timeout','articleService'];
    app.register.controller('indexController', controller);
});
