'use strict';
define(['app'], function(app) {
    var articleUpdateController = function($scope, $http, $routeParams, $location, articleService) {
        var articleId = $routeParams.articleId;
        $scope.types = [
            {
                name: '前端',
                id: '1'
            }, {
                name: "软件工程",
                id: '2'
            }
        ];

        var promise = articleService.getArticleById(articleId);
        promise.then(function(data) {
            var articleData = data.data;
            console.log(articleData)
            $scope.article = articleData;
            $scope.article.labels = $scope.article.labels.join(',');
            setType(articleData.type)
        });

        $scope.update = function() {
            $scope.article.type = $scope.article.type.id;
            $scope.article.labels = $scope.article.labels.split(',');
            $scope.article['draft'] = 1;//修改文章默认是草稿
            var updatePromise = articleService.updateArticle($scope.article);
            updatePromise.then(function(data) {
                console.log(data)
                if(data.operate) {
                    alert(data.msg);
                    $location.path('/article');
                } else {
                    alert(data.msg.message);
                }


            })
        };

        function setType(type) {
            angular.forEach($scope.types, function(item, index) {
                if(item.id == type) {
                    $scope.article.type = item;
                    console.log(item);
                    return false;
                }
            });
        }
    };

    articleUpdateController.inject = ['$scope', '$http', '$routeParams', '$location','articleService'];
    app.register.controller("articleUpdateController", articleUpdateController);
});