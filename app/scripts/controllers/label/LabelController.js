'use strict';
define(['app'], function(app) {
    var labelController = function($scope, labelService) {
        $scope.pagination = {
            page: 1,//当前页
            rows: 10,//总记录数
            count: 15,//每页显示数
            list: []
        };

        $scope.queryTableData = function() {
            labelService.queryLabels($scope.pagination).then(function(data) {
                if(data.status == 0) {
                    alert('后台错误');
                }
                angular.extend($scope.pagination, data.result);
            }, function(error) {
                alert(error);
            });
        };

        $scope.queryTableData();
    };

    labelController.inject = ['$scope', 'labelService'];
    app.register.controller("labelController", labelController);
});