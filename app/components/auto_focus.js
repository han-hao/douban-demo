/* 
* @Author: anchen
* @Date:   2016-11-23 09:37:16
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-23 12:56:15
*/

(function(angular){
  'user strict';
  var module=angular.module('moviecat.directives.auto_focus',[]);
  module.directive('autoFocus',['$location',function($location){
    return {
      restrict:'A',
      // 这儿的scope是指令的template里用的
      link:function($scope,ele,attrs){
        //解决页面载入时候没有active的问题：对比path的url地址的锚点和a的href，如果以它们开头就active
        // 拿到的是a的href
        // var path=$location.path();//  /coming_soon/1
        // 监视只能监视全局$scope上挂载的对象
        $scope.$location=$location;
        // 每次path发生变化，都让其设置active
        $scope.$watch('$location.path()',function(now){
          var aLink=ele.children().attr('href'); //   #/coming_soon/1
          var type=aLink.replace(/#(\/.+?\/)\d+/,'$1')// 被替换出来：/coming_soon/
          if(now.startsWith(type)){
            ele.parent().children().removeClass('active');
            ele.addClass('active');
          }
        })
        
        
        
        // dom操作都写在指令里
        // 路径被实时监控了，click也不需要了。
        // ele.on('click',function(){
        //   window.ele=ele;
        //   // 先清空
        //   ele.parent().children().removeClass('active');
        //   ele.addClass('active');
        // })
      }
    }
  }])
})(angular);