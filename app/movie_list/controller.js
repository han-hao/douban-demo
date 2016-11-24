
(function(){
  'use strict';
  // 假数据
  // 假数据删除了哦，可以放在前面做测试
  
  // 创建正在热映的模块
  var module=angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http']);
  // 配置模块的路由
  module.config(['$routeProvider', function($routeProvider) {
    // 做分页：在路由里加上匹配参数:page
    // 所以路由这儿名字就不要写死了，a标签锚点里，传进来是啥就是啥。
    $routeProvider.when('/:classify/:page', {
      controller: 'MovieListController',
      templateUrl: 'movie_list/view.html'
    });
  }]);

  // 在控制器中注入需要的服务
  // 控制器里要注入http.js里自己写的服务。$http服务就不需要了，因为提供的jsonp那边不支持。
  //注入常量。
  module.controller('MovieListController', ['$scope','$routeParams','$route','AppConfig','HttpService',function($scope,$routeParams,$route,AppConfig,HttpService) {

    //控制器分为两步：1、设计暴露的数据；2、设计暴露的行为
    //将其转为数字类型。
    var count=AppConfig.pageSize;//每页条数
    $scope.page=parseInt($routeParams.page);
    var start=($scope.page-1)*count;//当前页从哪儿开始
    $scope.subjects=[];
    $scope.message='';
    $scope.total=0; //共几条
    $scope.totalPages=0;//共几页
    // 开始加载的时候显示loading
    $scope.loading=true;
    $scope.dataTitle='Loading...';
    HttpService.jsonp(
      // 这里提取灵活的地址。
      AppConfig.apiAddress+$routeParams.classify,
      // 这里动态的分页。
      // 因为搜索页只是多了一个q参数，而q参数加不加都不影响其他的。
      // $routeParams的数据来源：1. 路由匹配出来的。 2.？后面的参数。后面那个问号哦。
      {start:start,count:count,q:$routeParams.q},
      function(data){
        // 这样写，页面绑定会没同步上，所以要用apply?
        $scope.subjects=data.subjects;    
        // apply就是让指定的表达式重新同步
        $scope.total=data.total;
        // apply调用一次会把所以得数据模型同步一下，也不用传参数。
        $scope.totalPages=Math.ceil($scope.total/count);//总页数除以每页多少。
        $scope.loading=false;
        $scope.dataTitle=data.title;
        $scope.$apply();

        //暴露一个更改页面的函数
        $scope.goPage=function(page){
          // 传过来是第几页就跳转到第几页
          // 使用route的update方法，url路由配置更新了就随着跟新。
          // 跟新当前路由上的值，传过来是几，就更新到几。
          //这要做一个合法范围的校验,这样别人吧ng-class去了，还是不能点。
          if(page>=1&&page<$scope.totalPages){
            $route.updateParams({page:page});            
          }
        }
      }
    );
  }]); 
})(angular);

// jsonp方式
    // 在angular中用JSONP的方式做跨域请求，就必须给地址加上一个参数，名字看对方需求,但是值是固定的：callback=JSON_CALLBACK,会将后面这坨字符串替换成一个随机的函数名。JSON_CALLBACK只是一个占位符，最终会被替换成一个随机的函数名。
    // 但是豆瓣不支持，所以这段代码没意义。
    // var doubanApiAddress='http://api.douban.com/v2/movie/in_theaters';
    // $http.jsonp(doubanApiAddress+'?callback=JSON_CALLBACK').then(function(response){      
    //   if(response.status==200){
    //     $scope.subjects=response.data.subjects;       
    //   }else{
    //     $scope.message='获取数据错误:'+response.statusText;
    //   };
    //   console.log(response)

    // },function(err){
    //   $scope.message='获取数据错误';
    // });
