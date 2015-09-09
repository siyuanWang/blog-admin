define(['app'], function(app) {
    var injectParams = ['$scope', '$http', '$location', '$window','userService'];
    var userController = function($scope, $http, $location, $window, userService) {
        $scope.users = [];

        var promise = userService.query({});
        promise.then(function(data) {
            $scope.users = data;
        }, function(reason) {
            alert('Failed: ' + reason);
        }, function(msg) {
            console.log('process:'+msg)
        });

        $scope.del = function(userId) {
            if($window.confirm('是否删除该用户？')) {
                var promise = userService.del(userId);
                promise.then(function(data) {
                    alert(data);
                    var users = [];
                    angular.forEach($scope.users, function(user, index) {
                        if(userId != user._id) {
                            users.push(user);
                        }
                    });
                    $scope.users = users;
                })
            }
        }
    };
    userController.$inject = injectParams;
    app.register.controller('userController', userController);
});