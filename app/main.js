'use strict';

requirejs.config({
    baseUrl: '/',
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery.min',
        'angular': 'bower_components/angular/angular',
        'angular-route': 'bower_components/angular-route/angular-route',
        'bootstrap-js':'bower_components/bootstrap/dist/js/bootstrap.min',
        'library': 'bower_components'
    },
    shim:{
        'angular':{
            exports:'angular'
        },
        'angular-route': {
            deps:['angular'],
            exports:'angular-route'
        }
    }
});

require(
    [
        'app',
        'scripts/directives/registerDirectives',
        'scripts/services/routeResolver',
        'scripts/services/articleService',
        'scripts/services/commentService',
        'scripts/services/userService',
        'scripts/services/labelService',
        'scripts/filters/appFilter',
        'scripts/config/appConfig'
    ],
    function(app) {
        angular.bootstrap(document, ['myApp']);
    });