/* 
* @Author: anchen
* @Date:   2016-11-22 12:44:48
* @Last Modified by:   anchen
* @Last Modified time: 2016-11-23 23:14:08
*/
(function(angular){
'user strict';
    // 由于默认angular提供的异步请求对象不支持自定义回调函数名
    // angular随机分配的回调函数名称不被豆瓣支持
    // 这样放在组件里写可以重用。
    var http=angular.module('moviecat.services.http',[]);
    // 跨域最终要把script节点放进去，所以要注入$document
    http.service('HttpService',['$document','$window',function($document,$window){
      // console.log($document);
      this.jsonp=function(url, data, callback) {
        // 1.把回调函数挂到全局：先挂，不然后面要append了，还没挂就执行了，会报错。
        var fnSuffix = Math.random().toString().replace('.', '');
        var cbFuncName = 'my_json_cb_' + fnSuffix;
        
        // 2.处理url
        var querystring = url.indexOf('?') == -1 ? '?' : '&';
        for (var key in data) {
          querystring += key + '=' + data[key] + '&';
        }
        querystring += 'callback=' + cbFuncName;
        // 3.创建script节点
        var scriptElement = $document[0].createElement('script');
        scriptElement.src = url + querystring;
        // 不推荐
        // $window[cbFuncName] = callback;
        // 把原本的写法改写成function形式，传进去参数data,等callback执行完，就干掉自己。
        $window[cbFuncName] = function(data){
            callback(data);
            $document[0].body.removeChild(scriptElement);
        }
        // 4.插入到页面
        $document[0].body.appendChild(scriptElement);
      };
   

    }]);
})(angular);