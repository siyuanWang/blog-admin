define(['app'], function(app) {
    var injectParams = ['$scope', '$http', '$location', 'userService'];
    var userController = function($scope, $http, $location, userService) {
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
            var promise = userService.del(userId);
            promise.then(function(data) {
                alert(data);
                $location.path('/user');
            })
        }
    };
    userController.$inject = injectParams;
    app.register.controller('userController', userController);
});