define(['app'], function(app) {
    var injectParams = ['$scope', '$http'];
    var userController = function($scope, $http) {

    };
    userController.$inject = injectParams;
    app.register.controller('userController', userController);
});