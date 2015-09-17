'use strict';
define(['app'], function(app) {
    app.config(['$routeProvider', 'routeResolverProvider','$controllerProvider','$compileProvider',
            '$provide','$filterProvider', function($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $provide, $filterProvider) {
                console.log('app config.');
                app.register = {
                    controller: $controllerProvider.register,
                    directive: $compileProvider.directive,
                    filter: $filterProvider.register,
                    factory: $provide.factory,
                    service: $provide.service
                };
                var route = routeResolverProvider.route;
                //app路由
                $routeProvider
                    .when('/user', route.resolve('userController','userlist','user','vm', false))
                    .when('/user/add', route.resolve('userAddController','userAdd','user','vm', false))
                    .when('/user/update/:userId', route.resolve('userUpdateController','userUpdate','user','vm', false))
                    .when('/article',route.resolve('articleController','articlelist','article', 'vm', false))
                    .when('/article/add',route.resolve('articleAddController','add','article', 'vm', false))
                    .when('/article/update/:articleId',route.resolve('articleUpdateController','update','article', 'vm', false))
                    .when('/article/show/:articleId',route.resolve('articleShowController','show','article', 'vm', false))
                    .otherwise(route.resolve('articleController','articlelist','article', 'vm', false));
                //textAngular定制化组件
                $provide.decorator('taOptions', ['taRegisterTool', '$delegate','$compile', function(taRegisterTool, taOptions, $compile){
                    //字体颜色选择器
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
                    //本地图片上传
                    taRegisterTool('localUploadImg', {
                        display: '<div class="btn btn-default"><a id="uploadPic" class="fa fa-file-image-o"></a></div>',
                        action: function(){
                            var articleScope = this.$parent.$parent;
                            var textAngularScope = this.$parent;
                            if(textAngularScope.uploadFile) {//如果有上传的文件，就push进去
                                articleScope.uploadFiles.push(textAngularScope.uploadFile);
                            }
                            var modalBody = '<div style="margin-bottom: 30px;"><div class="btn-group" style="width:100%" ng-show="previewImage"><button class="btn btn-success" sure-upload>确认上传</button><button class="btn btn-danger" cancel-upload>取消上传</button></div><file-field ng-show="previewImage == undefined" class="btn btn-default" style="width:100%;" ng-model="uploadFile"  preview="previewImage">upload</file-field></div><div ng-show="previewImage"><img style="width:100%;" ng-src="{{previewImage}}"/></div>';
                            var element = $compile('<div class="modal fade" tabindex="-1" role="dialog" style="display: none;"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button> <h4 style="text-align: center">本地文件上传</h4></div><div class="modal-body">'+modalBody+'</div></div></div></div>')(this);
                            var $editor = this.$editor();
                            var $modal = $(element);
                            $modal.modal("show");
                            $modal.on("hidden.bs.modal", function(e) {
                                console.log($editor.displayElements.text)
                                $editor.displayElements.text[0].focus();
                            });
                            this.modal = $modal;
                        }
                    });
                    // add the button to the default toolbar definition
                    taOptions.toolbar[1].push('colourRed');
                    taOptions.toolbar[1].push('localUploadImg');
                    return taOptions;
                }]);
            }]
    );
});
