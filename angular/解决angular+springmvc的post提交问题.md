AngularJS诞生于2009年，由Misko Hevery 等人创建，后为Google所收购。是一款优秀的前端JS框架，已经被用于Google的多款产品当中。AngularJS有着诸多特性，最为核心的 是：MVVM、模块化、自动化双向数据绑定、语义化标签、依赖注入、等等。

参考资料：

angularjs中文网：http://www.apjs.net/

angularjs官网：http://angularjs.org

 

写此文的背景：在学习使用angular的$http.post()提交数据时，后台接收不到参数值。

　　　　于是查阅了相关资料（写的最好的唯有此文http://victorblog.com/2012/12/20/make-angularjs-http-service-behave-like-jquery-ajax/）。

写此文的目的：通过上面提到的文章中的解决之道，结合自己的经验，总结了如下发现。

前端：html，jquery，angular

后端：java，springmvc

一、平常使用的post提交和接收方式
前端使用jquery提交数据。

复制代码
$.ajax({
    url:'/carlt/loginForm',
    method: 'POST',   
    data:{"name":"jquery","password":"pwd"},
    dataType:'json',
    success:function(data){
        //...
    }
});
复制代码
后端java接收：

复制代码
@Controller
public class UserController {
    @ResponseBody
    @RequestMapping(value="/loginForm",method=RequestMethod.POST)
    public User loginPost(User user){
        System.out.println("username:"+user.getName());
        System.out.println("password:"+user.getPassword());
        return user;
    }
}
复制代码
model（不要忘记get、set方法）：

复制代码
public class User {
    private String name;
    private String password;
    private int age;
    
    //setter getter method

}
复制代码
后台打印：

username:jquery
password:pwd

调用接口查看到的前端返回结果：



二、使用angularJs的post方法提交
复制代码
<div ng-app="myApp" ng-controller="formCtrl">
  <form novalidate>
    UserName:<br>
    <input type="text" ng-model="user.username"><br>
    PassWord:<br>
    <input type="text" ng-model="user.pwd">
    <br><br>
    <button ng-click="login()">登录</button>
  </form>
</div>
复制代码
js代码：

复制代码
var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope,$http) {
    $scope.login = function() {
        $http({
            url:'/carlt/loginForm',
            method: 'POST',            
            data: {name:'angular',password:'333',age:1}      
        }).success(function(){
            console.log("success!");
        }).error(function(){
            console.log("error");
        })
    };
});
复制代码
后台打印结果：

username:null
password:null

查看前端：

 

三、解决angular提交post问题。
相信看过上面提到的哪怕文章的人已经知道怎么解决问题了吧。文中是更改了angular的提交方式，使得angular的提交数据方式更像jquery的。

我试过，也是行得通的。然后我又试了另外一种方式。如下：

前端不变，依然是：

复制代码
var app = angular.module('myApp', []);
app.controller('formCtrl', function($scope,$http) {
    $scope.login = function() {
        $http({
            url:'/carlt/loginForm',
            method: 'POST',            
            data: {name:'angular',password:'333',age:1}      
        }).success(function(){
            console.log("success!");
        }).error(function(){
            console.log("error");
        })
    };
});
复制代码
后台变了，只是在User前加上@RequstBody，因为angular提交的是json对象：

复制代码
@Controller
public class UserController {
    @ResponseBody
    @RequestMapping(value="/loginForm",method=RequestMethod.POST)
    public User loginPost(@RequestBody User user){
        System.out.println("username:"+user.getName());
        System.out.println("password:"+user.getPassword());
        return user;
    }
}
复制代码
@RequestBody
作用： 

      i) 该注解用于读取Request请求的body部分数据，使用系统默认配置的HttpMessageConverter进行解析，然后把相应的数据绑定到要返回的对象上；

      ii) 再把HttpMessageConverter返回的对象数据绑定到 controller中方法的参数上。

使用时机：

A) GET、POST方式提时， 根据request header Content-Type的值来判断:

    application/x-www-form-urlencoded， 可选（即非必须，因为这种情况的数据@RequestParam, @ModelAttribute也可以处理，当然@RequestBody也能处理）；
    multipart/form-data, 不能处理（即使用@RequestBody不能处理这种格式的数据）；
    其他格式， 必须（其他格式包括application/json, application/xml等。这些格式的数据，必须使用@RequestBody来处理）；
B) PUT方式提交时， 根据request header Content-Type的值来判断:

    application/x-www-form-urlencoded， 必须；
    multipart/form-data, 不能处理；
    其他格式， 必须；
说明：request的body部分的数据编码格式由header部分的Content-Type指定；

四、解决了angular问题之后，发现jquery按照原来的方式提交post请求会报错（错误码415）。如下方式可以解决jquery提交问题：
复制代码
$.ajax({
    url:'/carlt/loginForm',
    method: 'POST',
    contentType:'application/json;charset=UTF-8',
    data:JSON.stringify({"name":"jquery","password":"pwd"}),
    dataType:'json',
    success:function(data){
        //...
    }
});
复制代码
json对象转json字符串：JSON.stringify(jsonObj); 