'use strict';
define([], function() {
    var app = angular.module('myApp',['ngRoute', 'routeResolverServices','ngAnimate','ui.router','ui.bootstrap','textAngular','datatables','bootstrap.fileField']);
    app.config(['$routeProvider', 'routeResolverProvider','$controllerProvider','$compileProvider',
            '$provide','$filterProvider',

            function($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider,
                     $provide, $filterProvider) {
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

                $provide.decorator('taOptions', ['taRegisterTool', '$delegate','$compile', function(taRegisterTool, taOptions, $compile){
                    taRegisterTool('colourRed', {
                        display: '<div class="btn btn-default"><i id="colorBtn" class="fa fa-font"></i></div>',
                        action: function(){
                            var colorDiv = '<div style="width:20px;height:20px;"></div>';
                            var that = this;
                            var $colorBtn = $('#colorBtn');
                            $colorBtn.popover({
                                title: 'ColorPicker',
                                content: '<table id="colorTable">' +
                                '<tr><td style="background-color: red;">'+colorDiv+'</td><td style="background-color: green;">'+colorDiv+'</td><td style="background-color: blue;">'+colorDiv+'</td><td style="background-color: black;">'+colorDiv+'</td></tr>' +
                                '<tr><td style="background-color: white;">'+colorDiv+'</td><td style="background-color: grey;">'+colorDiv+'</td><td style="background-color: pink;">'+colorDiv+'</td><td style="background-color: orange;">'+colorDiv+'</td></tr>' +
                                '<tr><td style="background-color: darkgrey;">'+colorDiv+'</td><td style="background-color: dodgerblue;">'+colorDiv+'</td><td style="background-color: purple;">'+colorDiv+'</td><td style="background-color: yellow;">'+colorDiv+'</td></tr>' +
                                '</table>',
                                placement : 'bottom',
                                html: true
                            });
                            $("#colorTable").find("td").on('click',function(e) {
                                var $this = $(this);
                                $colorBtn.popover("destroy");
                                that.$editor().wrapSelection('forecolor', $this.css('background-color'));
                                e.preventDefault();
                            })

                        }
                    });

                    taRegisterTool('localUploadImg', {
                        display: '<div class="btn btn-default"><a id="uploadPic" class="fa fa-file-image-o"></a></div>',
                        action: function(){
                            //var that = this;
                            //console.log(that.$parent)
                            //var element = $compile("<div>ahahahaha</div>")(that.$parent);
                            //element.html("hahahah");
                            //
                            //var $modal = $('<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" style="display: none;"> <div class="modal-dialog modal-sm"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button> <h4 class="modal-title" id="mySmallModalLabel">本地文件上传</h4></div><div class="modal-body"></div></div></div></div>');
                            //$modal.modal("show");
                            function insertNodeAtCursor(node) {
                                var sel, range, html;
                                if (window.getSelection) {
                                    sel = window.getSelection();
                                    if (sel.getRangeAt && sel.rangeCount) {
                                        sel.getRangeAt(0).insertNode(node);
                                    }
                                } else if (document.selection && document.selection.createRange) {
                                    range = document.selection.createRange();
                                    html = (node.nodeType == 3) ? node.data : node.outerHTML;
                                    range.pasteHTML(html);
                                }
                            }
                            function placeCaretAtEnd(el) {
                                el.focus();
                                if (typeof window.getSelection != "undefined"
                                    && typeof document.createRange != "undefined") {
                                    var range = document.createRange();
                                    range.setStartAfter( el );
                                    range.setEndAfter( el );
                                    var sel = window.getSelection();
                                    sel.removeAllRanges();
                                    sel.addRange(range);
                                } else if (typeof document.body.createTextRange != "undefined") {
                                    var textRange = document.body.createTextRange();
                                    textRange.moveToElementText(el);
                                    textRange.collapse(false);
                                    textRange.select();
                                }
                            }

                            var element = $compile('<file-field class="btn" ng-model="uploadFile"  preview="previewImage">Select File</file-field><br/><div ng-show="previewImage"><h3>Preview</h3><img ng-src="{{previewImage}}" width="200"></div>')(this.$parent);
                            console.log(element)
                            this.$editor().displayElements.text[0].focus();
                            insertNodeAtCursor(element[0]);
                            insertNodeAtCursor(element[1]);
                            insertNodeAtCursor(element[2]);
                            placeCaretAtEnd(element[0])
                            return this.$editor().wrapSelection("localUploadImg", "&nbsp;");

                        }
                    });
                    // add the button to the default toolbar definition
                    taOptions.toolbar[1].push('colourRed');
                    taOptions.toolbar[1].push('localUploadImg');
                    return taOptions;
                }]);
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