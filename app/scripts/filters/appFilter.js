'use strict';
define(['app'], function(app) {
    app.filter('userFilter', function() {
        return function(users){
            angular.forEach(users, function(user, index) {
                if(user.sex == '0') {
                    user.sex = '男';
                } else if(user.sex == '1') {
                    user.sex = '女';
                }
            });

            return users;
        }
    });
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
});
