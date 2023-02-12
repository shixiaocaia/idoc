Do a Pool Webserver
===
## README

项目来源：[TinyWebServer](https://github.com/qinguoyi/TinyWebServer)

参考内容：

✅小林图解系统

✅[牛客Linux高并发服务器](https://www.nowcoder.com/courses/cover/live/504)：对于每部分主要的函数使用方法介绍，源于游双的书，项目实现后面省略了很多。

✅Linux高性能服务器编程

✅UNIX环境高级编程

✅各类博客

---

## 整体流程

![](http://pic.shixiaocaia.fun/202301261440049.jpg)



## 快速开始

- 服务器测试环境
  - Ubuntu版本16.04
  - MySQL版本5.7.29
- 浏览器测试环境
  - Windows、Linux
  - Chrome

- 创建db，写入user表

```shell
// 建立yourdb库
create database yourdb;

// 创建user表
USE yourdb;
CREATE TABLE user(
    username char(50) NULL,
    passwd char(50) NULL
)ENGINE=InnoDB;

// 添加数据
INSERT INTO user(username, passwd) VALUES('name', 'passwd');
```

- 修改main.cpp中的数据库初始化信息

```shell
//数据库登录名,密码,库名
string user = "root";
string passwd = "root";
string databasename = "yourdb";
```

- 编译运行

```
make

./server 5520
```

## Todolist

✅环境配置

⬜CMAKE学习

源码阅读

✅封装类

✅线程池

✅I/O多路复用

✅HTTP报文解析

✅定时器

✅日志系统

⬜数据库连接池

⬜注册登录

⬜压力测试

## 重构时候思考的问题

1. socket网络编程那边初始化，变量信息还需要熟悉。
2. 对于异常情况的处理，使用函数时判断合法性。
3. 程序结束时，处理上述用到的文件描述符。
4. 文件的读写操作，需要熟悉。
5. HTTP报文解析部分，能不能通过正则表达式解析。
6. 为什么在日志和数据库连接部分需要使用单例模式
7. proactor模式
8. 各种锁的机制，优缺点，使用场景是什么
9. Webbench错误
10. 如何解决段错误

