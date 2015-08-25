'use strict';
define(['app'], function(app) {
    var injectParams = ['$scope'];
    var controller = function($scope) {
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.slides = [
            {img: '/images/banner_1.jpg', text:''},
            {img: '/images/banner_2.jpg', text:''},
            {img: '/images/banner_3.jpg', text:''}
        ]
    };
    controller.$inject = injectParams;
    app.register.controller('carouselController', controller);
});
