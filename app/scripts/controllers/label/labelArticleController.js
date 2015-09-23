'use strict';
define(['app'], function(app) {
    var labelArticleController = function($scope, labelService, $routeParams) {
        var label_id = $routeParams.labelId;
        $scope.pagination = {
            page: 1,//当前页
            rows: 0,//总记录数
            count: 10,//每页显示数
            list: []
        };
        $scope.queryTableData = function() {
            labelService.getLabelArticlesByLabelId(label_id, $scope.pagination).then(function(data) {
                if(data.status == 0) {
                    alert('后台错误');
                }
                console.log(data.result);
                angular.extend($scope.pagination, data.result);
                //注册一个广播，directive端接收广播
                $scope.$broadcast("paginationData");
            }, function(error) {
                alert(error);
            });
        };

        $scope.queryTableData();
    };

    labelArticleController.inject = ['$scope', 'labelService','$routeParams'];
    app.register.controller("labelArticleController", labelArticleController);
});