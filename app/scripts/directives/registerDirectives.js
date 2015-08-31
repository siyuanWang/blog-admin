'use strict';
define(['app'], function(app) {
    app.directive('equals', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel) {
                if (!ngModel) return;
                scope.$watch(attrs.ngModel, function () {
                    validate();
                });
                attrs.$observe('equals', function (val) {
                    validate();
                });

                var validate = function () {
                    var val1 = ngModel.$viewValue;
                    var val2 = attrs.equals;

                    ngModel.$setValidity('equals', !val1 || !val2 || val1 === val2);
                };
            }
        }
    });

    app.directive('equals', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                if(!ngModel) return;
                scope.$watch(attrs.ngModel, function() {
                    validate();
                });
                attrs.$observe('equals', function (val) {
                    validate();
                });

                var validate = function() {
                    var val1 = ngModel.$viewValue;
                    var val2 = attrs.equals;

                    ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
                };
            }
        }
    });

    app.directive('password', function() {
        var regExp = /^[0-9a-zA-Z]{6,16}$/;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                ngModel.$validators.password = function(modelValue, viewValue) {
                    if (ngModel.$isEmpty(modelValue))
                        return true;

                    if (regExp.test(viewValue))
                        return true;

                    return false;
                };
            }
        }
    });

    app.directive('checkUserName', ['$http', function($http) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                ngModel.$validators.checkUserName = function(modelValue, username) {
                    if(ngModel.$isEmpty(modelValue))return true;
                    $http.get('/user/checkusername', {params: {username: username}})
                        .success(function(data, status, headers, config, statusText) {
                            if(data && data.username == username) {
                                ngModel.$setValidity('checkUserName', false);
                            } else {
                                ngModel.$setValidity('checkUserName', true);
                            }

                        })
                        .error(function(data, status, headers, config) {
                            ngModel.$setValidity('checkUserName', false);
                        });
                    scope.fields.username = username;
                };
            }
        }
    }]);

    app.directive('checkPhoneNumber', function() {
        var regExp = /^(86)?\d{11}$/;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                ngModel.$validators.checkPhoneNumber = function(modelValue, viewValue) {
                    if(ngModel.$isEmpty(modelValue))return true;
                    if(regExp.test(viewValue)) {
                        return true;
                    } else {
                        return false;
                    }
                };
            }
        }
    });

    app.directive('menuControl', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                var $elem = angular.element(elem);
                $elem.on('click', function(e) {
                    angular.forEach($elem.children(), function($e) {
                        $e = angular.element($e);
                        $e.removeClass('active');
                    });
                    var $target = angular.element(e.target);
                    $target.addClass('active');
                })

            }
        }
    });
});