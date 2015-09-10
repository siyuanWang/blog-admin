'use strict';
define(['app'], function(app) {
    var controller = function($scope, $http, $location, articleService) {
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
            $scope.article.labels = $scope.article.labels.split(',');
            $scope.article['draft'] = 1;//发布文章默认是草稿
            $http.post('/article', $scope.article)
                .success(function(data, status, headers, config) {
                    alert(data);
                    $location.path('/article');
                })
                .error(function(data, status, headers, config) {
                    alert(data);
                });
        }
    };

    controller.inject = ['$scope', '$http', '$location', 'articleService'];
    app.register.controller("articleAddController", controller);
});