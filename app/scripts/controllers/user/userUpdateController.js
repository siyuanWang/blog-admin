define(['app'], function(app) {
    var injectParams = ['$scope', '$http', '$routeParams', 'userService'];
    var userUpdateController = function($scope, $http, $routeParams, userService) {
        var userId = $routeParams.userId;
        $scope.sexItems = [
            {name: '男', value: '0'},
            {name: '女', value: '1'}
        ];

        var promise = userService.queryById(userId);
        promise.then(function(data) {
            $scope.fields = data.data;
        });

        $scope.submit = function() {
            if($scope.userForm.$valid) {
                $scope.fields.sex = $scope.fields.sex.value;
                var promise = userService.update($scope.fields);
                promise.then(function(data) {
                    alert(data);
                })
            } else {

            }
        };

        $scope.master = {};
        $scope.validateBeforSubmit = function(fields) {
            $scope.master = angular.copy(fields);
        };
        $scope.reset = function(form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            $scope.fields = angular.copy($scope.master);
        };

        $scope.reset();
    };
    userUpdateController.$inject = injectParams;
    app.register.controller('userUpdateController', userUpdateController);
});