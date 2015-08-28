define(['app'], function(app) {
    var injectParams = ['$scope', '$http', 'userService'];
    var userController = function($scope, $http, userService) {
        $scope.users = [];

        var promise = userService.query({});
        promise.then(function(data) {
            $scope.users = data;
        }, function(reason) {
            alert('Failed: ' + reason);
        }, function(msg) {
            console.log('process:'+msg)
        });
    };
    userController.$inject = injectParams;
    app.register.controller('userController', userController);
});