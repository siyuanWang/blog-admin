'use strict';
define([], function() {
    var app = angular.module('myApp',['ngRoute', 'routeResolverServices','ngAnimate','ui.router','ui.bootstrap','textAngular','datatables']);
    app.config(['$routeProvider', 'routeResolverProvider','$controllerProvider','$compileProvider',
            '$provide','$filterProvider',

            function($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider,
                     $provide, $filterProvider, $filter) {
                console.log('app config.');

                app.register = {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service
                };
                var route = routeResolverProvider.route;

                $routeProvider
                    .when('/user', route.resolve('userController','userlist','user','vm', false))
                    .when('/user/add', route.resolve('userAddController','userAdd','user','vm', false))
                    .when('/user/update/:userId', route.resolve('userUpdateController','userUpdate','user','vm', false))
                    .when('/article/add',route.resolve('articleAddController','add','article', 'vm', false))
                    .otherwise(route.resolve('articleAddController','add','article', 'vm', false));
            }]
    );
    app.filter('sanitize',['$sce', function($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        }
    }]);

    app.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
        $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
            console.log('Current route name: ' + $location.path());
            var path = $location.path();//获得当前路由地址

        })
    }]);

    return app;
});