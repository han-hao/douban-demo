
(function(){
  'use strict';
  // 假数据
  // 假数据删除了哦，可以放在前面做测试
  
  // 创建正在热映的模块
  var module=angular.module('moviecat.in_theaters', ['ngRoute']);
  // 配置模块的路由
  module.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/in_theaters', {
      controller: 'InTheatersController',
      templateUrl: 'in_theaters/view.html'
    });
  }]);

  // 在控制器中注入需要的服务
  module.controller('InTheatersController', ['$scope','$http',function($scope,$http) {
    //控制器分为两步：1、设计暴露的数据；2、设计暴露的行为
    $scope.subjects=[];
    $scope.message='';

    // 以下是测试$http，在当前的地址里写个文件做请求， 不然就是跨域了。
    // 不建议用相对路径写，就是../往外面找的方式？因为用路由的方式，目录结构会发生一些变化。建议用斜线开始的方式（绝对路径），最保险。/代表网站根目录。
    $http.get('/app/data.json').then(function(response){
      // 返回的response是整个对象哦，我们只要response里的subjects
      // 这个代码是异步请求完成后才执行，需要过一段时间，而angular数据绑定有可能在那个之前就完成了:所以需要在这之前就赋值，一个空数组。
      // 注意哦，这里它自己把真正的数据包装在了返回的对象的data里。
      if(response.status==200){
        $scope.subjects=response.data.subjects;       
      }else{
        // 成功的回调也会写错，错误的回调也会写错，所以两个地方都要写
        $scope.message='获取数据错误';
      };
      console.log(response)

    },function(err){
      $scope.message='获取数据错误';
    });
  }]); 
})(angular)
