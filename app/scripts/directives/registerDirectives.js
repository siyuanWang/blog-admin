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

    app.directive('sureUpload', function ($compile) {
        return {
            restrict: 'A',
            scope: false,
            link: function ($scope, element, attrs) {
                var $sureUploadBtn = angular.element(element);
                var $editor = $scope.$editor();
                $sureUploadBtn.on("click", function(e) {
                    var img = $compile('<div style="padding:5px;"><img ng-src="'+$scope.previewImage+'" width="400"/></div>')(this);
                    $editor.displayElements.text.append(img);
                    $scope.modal.modal('hide');
                    $scope.previewImage = undefined;
                    $scope.$parent.$parent.uploadFiles.push($scope.uploadFile);
                })
            }
        };
    });

    app.directive('cancelUpload', function ($compile) {
        return {
            restrict: 'A',
            scope: false,
            link: function ($scope, element, attrs) {
                var $cancelUploadBtn = angular.element(element);
                $cancelUploadBtn.on('click', function(e) {
                    $scope.modal.modal('hide');
                    $scope.previewImage = undefined;
                });

            }
        };
    });

    app.directive('wTable', function () {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attrs) {
                //monitor the broadCast 'paginationData'
                scope.$on("paginationData", function() {
                    var needRequest = true;//need request remote data
                    var page = scope.pagination.page, rows = scope.pagination.rows, count =  scope.pagination.count;
                    var pageNum = (rows%count == 0)?(Math.floor(rows/count)):(Math.floor(rows/count) + 1);
                    //remove pagination container
                    angular.element(element).find(".pagination-container").remove();
                    //bootstrap pagination start
                    //pagination container
                    var $paginationContainer = angular.element("<div class='pagination-container'></div>");
                    //pagination buttons
                    var $btnGroup = angular.element("<div class='btn-group' style='float: left;'></div>");
                    var $btnGroupBefor = angular.element("<button class='btn btn-default' role='first'>first</button><button class='btn btn-default' role='previous'><</button>");
                    var $btnGroupAfter = angular.element("<button class='btn btn-default' role='next'>></button><button class='btn btn-default' role='last'>last</button>");
                    $btnGroup.append($btnGroupBefor);
                    for(var i = 1; i <= pageNum; i++) {
                        var $pageBtn;
                        //add 'active' class to current page button
                        if(i === page) {
                            $pageBtn = angular.element("<button class='btn btn-default active' role='number'>"+i+"</button>");
                        } else {
                            $pageBtn = angular.element("<button class='btn btn-default' role='number'>"+i+"</button>");
                        }

                        $btnGroup.append($pageBtn);
                    }
                    $btnGroup.append($btnGroupAfter);
                    //pagination information
                    var $info = angular.element("<div style='float: right;line-height: 34px;padding-right: 30px;'>共"+pageNum+"页，当前第"+page+"页</div>");
                    var $clear = angular.element("<div style='clear: both'></div>");
                    //combine the pagination dom
                    $paginationContainer.append($btnGroup).append($info).append($clear);
                    var $element = angular.element(element);
                    $element.append($paginationContainer);
                    //bootstrap pagination end
                    function removeBtnClass(btns) {
                        btns.each(function() {
                            arguments[1].classList.remove('active');
                        })
                    }
                    //pagination events bind
                    var $btns = $btnGroup.children();
                    $btns.each(function() {
                        var btn = arguments[1];
                        btn.addEventListener("click", function(e) {
                            var target = e.target;
                            var $activeBtn = $btnGroup.find(".active");

                            removeBtnClass($btns);
                            var roleName = angular.element(e.target).attr("role");
                            switch(roleName) {
                                case "number":
                                    target.classList.add("active");
                                    scope.pagination.page = parseInt(target.innerText);
                                    needRequest = true;
                                    break;
                                case "previous":
                                    if(scope.pagination.page > 1) {
                                        scope.pagination.page--;
                                        needRequest = true;
                                    } else {
                                        $activeBtn[0].classList.add('active');
                                        needRequest = false;
                                    }
                                    break;
                                case "next":
                                    if(scope.pagination.page < pageNum) {
                                        scope.pagination.page++;
                                        needRequest = true;
                                    } else {
                                        $activeBtn[0].classList.add('active');
                                        needRequest = false;
                                    }
                                    break;
                                case "first":
                                    needRequest = true;
                                    scope.pagination.page = 1;
                                    break;
                                case "last":
                                    needRequest = true;
                                    scope.pagination.page = pageNum;
                                    break;
                                default:
                                    throw new Error("pagination button role is wrong.");
                            }
                            if(needRequest)
                                scope.queryTableData();
                        });
                    });
                })

            }
        };
    });
});