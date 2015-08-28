define(['app'], function(app) {
    var injectParams = ['$scope', '$http', '$routeParams', '$location', 'userService'];
    var userUpdateController = function($scope, $http, $routeParams, $location, userService) {
        var userId = $routeParams.userId;
        $scope.sexItems = [
            {name: '男', value: 0},
            {name: '女', value: 1}
        ];

        var promise = userService.queryById(userId);
        promise.then(function(data) {
            var fields = data.data;
            $scope.fields = data.data;
            setSex(fields.sex);
        });

        function setSex(sex) {
            angular.forEach($scope.sexItems, function(item, index) {
                if(item.value === sex) {
                    $scope.fields.sex = item;
                    return false;
                }
            });
        }

        $scope.submit = function() {
            if($scope.userForm.$valid) {
                $scope.fields.sex = $scope.fields.sex.value;
                var promise = userService.update($scope.fields);
                promise.then(function(data) {
                    alert(data);
                    $location.path('/user');
                })
            } else {

            }
        };
    };
    userUpdateController.$inject = injectParams;
    app.register.controller('userUpdateController', userUpdateController);
});