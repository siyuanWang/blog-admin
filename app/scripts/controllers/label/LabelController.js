'use strict';
define(['app'], function(app) {
    var labelController = function($scope, labelService) {
        labelService.queryLabels().then(function(data) {
            if(data.status == 0) {
                alert('后台错误');
            }
            $scope.labels = data.result;
        }, function(error) {

        });
    };

    labelController.inject = ['$scope', 'labelService'];
    app.register.controller("labelController", labelController);
});