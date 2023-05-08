Shell
===
## 说点什么

我们常使用的系统都具有*图形用户界面(GUI)*，进行点击操作，但并不是每个平台都具有GUI，但几乎所有平台都支持，*文字接口(Shell)*。其中*bash(Bourne Again Shell)*就是其中一种shell。

shell其实是一种编程环境。

## 输出基本信息

```bash
user:~$
# ~表示当前位置是home
# $表示非root

echo hello
# 输出参数hello

which echo
# 输出echo函数所在的目录

pwd
# 输出当前目录位置

.  # 表示当前目录
.. # 表示上一级目录

ls
# 输出当前路径下所有文件

ls -l /home

man ls

q
# 退出
```

## 在程序间创建连接

```shell
echo hello > hello.txt
cat hello.txt
# 输入hello到hello.txt，print信息到屏幕当中

>>
# 向一个文件尾部追加内容
```

