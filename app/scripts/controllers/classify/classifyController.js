'use strict';
define(['app'], function(app) {
    var classifyController = function($scope, $http, $location, articleService) {

    };

    classifyController.inject = ['$scope', '$http', '$location', 'articleService'];
    app.register.controller("classifyController", classifyController);
});