define(['app'], function(app) {
    var injectParams = ['$scope', '$http'];
    var addUserController = function($scope, $http) {
        $scope.sexItems = [
            {name: '男', value: '0'},
            {name: '女', value: '1'}
        ];
        $scope.submit = function() {
            if($scope.userForm.$valid) {
                $scope.fields.sex = $scope.fields.sex.value;
                $http.post('/user', $scope.fields)
                    .success(function(data, status, headers, config) {
                        alert(data);
                    })
                    .error(function(data, status, headers, config) {
                        alert(data);
                    });
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
    addUserController.$inject = injectParams;
    app.register.controller('userAddController', addUserController);
});