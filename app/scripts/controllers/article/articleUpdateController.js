'use strict';
define(['app'], function(app) {
    var articleUpdateController = function($scope, $http, articleService) {
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

    articleUpdateController.inject = ['$scope', '$http', 'articleService'];
    app.register.controller("articleUpdateController", articleUpdateController);
});