
(function(){
  'use strict';
  
  // 创建电影细节的模块
  var module=angular.module('moviecat.movie_detail', ['ngRoute','moviecat.services.http']);
  // 配置模块的路由
  module.config(['$routeProvider', function($routeProvider) {
    // 这里路由配置一个detail
    $routeProvider.when('/detail/:id', {
      controller: 'MovieDetailController',
      templateUrl: 'movie_detail/view.html'
    });
  }]);

  // 在控制器中注入需要的服务
  // 控制器里要注入http.js里自己写的服务。$http服务就不需要了，因为提供的jsonp那边不支持。
  module.controller('MovieDetailController', ['$scope','$routeParams','$route','HttpService','AppConfig',function($scope,$routeParams,$route,HttpService,AppConfig) {
    // 暴露一个电影对象，这样才能在界面上绑定
    $scope.movie={};
    $scope.loading=true;
    var id=$routeParams.id;
    var apiAddress=AppConfig.apiAddress+'/subject/'+id;

    //跨域的方式拿到数据
    HttpService.jsonp(apiAddress,{},function(data){
      $scope.movie=data;
      $scope.loading=false;
      $scope.$apply();
    });

  }]); 
 
  
})(angular);

