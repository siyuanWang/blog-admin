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
                    .when('/article',route.resolve('articleController','articlelist','article', 'vm', false))
                    .when('/article/add',route.resolve('articleAddController','add','article', 'vm', false))
                    .when('/article/update/:articleId',route.resolve('articleUpdateController','update','article', 'vm', false))
                    .when('/article/show/:articleId',route.resolve('articleShowController','show','article', 'vm', false))
                    .otherwise(route.resolve('articleController','articlelist','article', 'vm', false));
            }]
    );
    app.filter('sanitize',['$sce', function($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        }
    }]);
    //替换draft 为“草稿”或者“已发布”
    app.filter('articleDraftFilter', function() {
        return function(draftValue) {
            if(draftValue == 1) {
                return '草稿';
            } else {
                return '已发布';
            }
        }
    });
    //替换article.labels 为逗号分隔的字符串
    app.filter('articleLabelFilter', function() {
        return function(labels) {
            return labels.join(",");
        }
    });

    app.run(['$rootScope','$location', '$routeParams', function($rootScope, $location, $routeParams) {
        $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
            console.log('Current route name: ' + $location.path());
            var path = $location.path();//获得当前路由地址

        })
    }]);

    return app;
});