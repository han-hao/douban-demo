
(function(angular){
  'use strict';
  // 主模块
  var module=angular.module('moviecat', [
    'ngRoute',
    'moviecat.in_theaters',
    'moviecat.coming_soon',
    'moviecat.top250'
  ]);
  module.config(['$routeProvider', function($routeProvider) {
      // 什么都没有的时候跳转到这儿
    $routeProvider.otherwise({redirectTo: '/in_theaters'});
  }]);
})(angular)