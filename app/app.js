
(function(angular){
  'use strict';
  // 主模块
  var module=angular.module('moviecat', [
    'ngRoute',
    // 这个放前面
    'moviecat.movie_detail',
    'moviecat.movie_list',
    'moviecat.directives.auto_focus'
  ]);
  module.config(['$routeProvider', function($routeProvider) {
      // 什么都没有的时候跳转到这儿
      // 一开始右键浏览而非刷新的时候走这儿，但是是没有任何的锚点的。所以一开始$location.path为空。然后，才加上了/in_theaters/1,所以一开始的active不生效。必须刷新一下。
      // 一开始路由里没东西，路由跳转了才有。解决：实时监控locationpath
    $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
  }])
  

  // 为模块定义一些常量，可以直接在控制器里注入appConfig就行
  module.constant('AppConfig',{
    pageSize:10,
    apiAddress:'http://api.douban.com/v2/movie/'
  })


  //搜索部分第一种加新控制器的方法：
  module.controller('SearchController',['$scope','$route','HttpService',function($scope,$route,HttpService){
    $scope.input='';
    $scope.search=function(){
      // 还要确保当前是搜索页哦，不管当前在那个页面都切换到搜索api
      $route.updateParams({'classify':'search', 'q':$scope.input});
    }
  }]);

  // 第一种方法的控制器
  // .controller('NavController',['$scope','$location',function($scope,$location){
  //   $scope.$location=$location;
  //   // 要监视一下路径哦   
  //   $scope.$watch('$location.path()',function(now){
  //     console.log(now)
  //     if(now.startsWith('/in_theaters')){
  //       $scope.type='in_theaters';
  //     }else if(now.startsWith('/coming_soon')){
  //       $scope.type='coming_soon';
  //     }else if(now.startsWith('/top250')){
  //       $scope.type='top250';
  //     }
  //   })
  // }])
})(angular)