'use strict';
define(['app'], function(app) {
    var classifyController = function($scope, $http, $location, classifyService) {
        classifyService.queryList().then(function(result) {
            $scope.classifies = result.result;
        }, function(error) {
            $scope.classifies = [];
        })
    };

    classifyController.inject = ['$scope', '$http', '$location', 'classifyService'];
    app.register.controller("classifyController", classifyController);
});