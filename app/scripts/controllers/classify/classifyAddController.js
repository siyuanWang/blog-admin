'use strict';
define(['app'], function(app) {
    var classifyAddController = function($scope, $http, $location, classifyService) {
        $scope.classify = {};
        $scope.submit = function() {
            classifyService.save($scope.classify).then(function(result) {
                console.log(result);
            }, function(error) {

            });
        }
    };

    classifyAddController.inject = ['$scope', '$http', '$location', 'classifyService'];
    app.register.controller("classifyAddController", classifyAddController);
});