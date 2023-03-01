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

⬜用WireShark抓包，分析通信过程
