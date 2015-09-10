---
title: java代码编写规范
tags: java,逍遥神风
grammar_cjkRuby: true
---
从事java开发工作多年，抽时间翻看了以前开发的项目工程，针对java代码编写规范进行了一下总结。
编写高质量的代码不是一件容易的事情，这需要长期的工作经验积累以及java设计模型学习，不断地思索、改进，最终形成一套适合自己的代码编写习惯。本文结合自身的开发经验进行总结，不足之处望大家指出。
## java代码命名规范
---
> 切忌使用==没有任何意义==的英语字母进行命名

例如求10以内的偶数个数:
```java?linenums
int j = 0;
for(int i = 0; i < 10;i++){
    if(i % 2 == 0){
        j++;
    }
    ……
}
println(j);
……
```
这是一段比较常见的代码写法，针对变量`i`,`j`这样写无可厚非，但是如果说是一个复杂的算法问题呢？本人曾经见过嵌套5-6层的循环-判断语句再加业务代码回调函数，其代码可读性极差，不易维护。所以必须要养成良好的代码编写习惯，编写的代码才能经得起时间的考验。将上述代码改为：
```java?linenums
int count = 0;
for(int index = 0; index < 10;i++){
    if(index % 2 == 0){
        count++;
    }
    ……
}
println(count);
……
```
> 尽量避免使用==拼音==以及==拼音首字母组合==：
 
```java?linenums   
int cishu =5; // 次数
double je = 1000.00 // 金额
```
这种变量写法也是比较常见的一种，但是久而久之不易代码维护以及代码审查，特别是拼音首字母组合的变量写法，很多时候只能靠看上下文去猜字段的含义。

> 要使用英文，而且要使用准确的英语，无论是拼写还是语法：

- 名词单数，必须使用单数英文，如`Account`、`Customer`。
- 对于数组，列表等对象集合的命名，必须使用复数，而且最好按照英文的语法基础知识使用准确的复数形式，如 `List<Account> accounts`、`Set<Customer> Customers`。
- 对于boolean值的属性，很多开发人员习惯使用isXXX，如`isClose`（是否关闭），但这里有两点建议：
  - 最好不要带“is”，因为JavaBean的规范，为属性生成get/set方法的时候，会用“get/set/is”，上面的例子，生成get/set方法就会变成“getIsClose/isIsClose/getIsClose”，非常别扭；
  - 由于boolean值通常反映“是否”，所以准确的用法，应该是是用“形容词”，上面的例子，最终应该被改为 `checked`，那么get/set方法就是“getChecked/isChecked/setChecked”，非常符合英语阅读习惯。

> 方法名的命名，需要使用==动宾结构短语==或==是动词+表语结构短语===：

```java?linenums
createOrder(Order order) good 
orderCreate(Order order) bad
emoveOrders(List<Order> orders) good 
removeOrder(List<Order> order) bad
```
> 对于常见的==增删改查==方法，命名最好要谨慎：

- 增加：最常见使用`create`和`add`，但最好根据英语的语义进行区分，这有助于理解，`create`代表创建，`add`代表增加。
- 修改：常见的有`alter`、`update`、`modify`，个人觉得`modify`最准确。
- 查询：对于获取单个对象，可以用`get`或`load`，但个人建议用`get`，对于不分条件列举，用list，对于有条件查询，用`search`,对于无条件查询建议用`find`。
- 删除：常见的有`delete`和`remove`，但删除建议用`delete`。

另外==增删改查==的命名要注意配合spring的事物管理机制使用效果可能更好一些。

> 成员变量不要重复类的名称

很多人喜欢在`Account`对象的成员变量中使用`accountId`，`accountNumber`等命名，其实没有必要，想想成员变量不会鼓孤立的存在，你引用`accountId`，必须是`account.accountId`，用`account.id`已经足够清晰了。

