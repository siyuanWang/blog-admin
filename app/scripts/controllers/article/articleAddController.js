'use strict';
define(['app'], function(app) {
    var controller = function($scope, $http, articleService) {
        $scope.article = {
            title: "",
            introduction: "",
            labels: "",
            content: ""
        };

        $scope.init = {
            types: [{
                name: '前端',
                id: '1'
            }, {
                name: "软件工程",
                id: '2'
            }]
        };

        function show() {
            articleService.setArticle($scope.article);
        }

        $scope.submit = function() {
            $scope.article.type = $scope.article.type.id;
            $http.post('/article', $scope.article)
                .success(function(data, status, headers, config) {
                    alert(data);
                })
                .error(function(data, status, headers, config) {
                    alert(data);
                });
        }
    };

    controller.inject = ['$scope', '$http', 'articleService'];
    app.register.controller("articleAddController", controller);
});