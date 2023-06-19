环境配置
===

## iDoc环境

- [Node.js](http://nodejs.org/) (版本需不低于 14，建议使用 Node.js `14+` 及以上版本)
- 使用 npm 安装 idoc：`npm install -g idoc`


## Go

1. 下载安装包

2. 环境变量配置，使得所有代码布置到指定的GOPATH目录下

   这些路径下又必须分别包含三个规定的目录：`src`、`pkg` 和 `bin`，这三个目录分别用于存放源码文件、包文件和可执行文件。

3. 设置代理

4. Vscode下安装Go插件，并ctrl + shift + p安装`go install`

5. dlv错误时，`go env -w GOARCH=amd64`，dlv调试工具不支持386。

- [参考文章](https://mp.weixin.qq.com/s/J01LY7s6xMB8Lk10sxTFhg)

```bash
go version
go env
# 查看配置环境

go env -w GOPROXY=https://goproxy.cn,https://goproxy.io,direct
# 配置代理
```

## Redis

- 下载地址：https://github.com/tporadowski/redis/releases。

- 添加路径到环境变量
- 打开一个 **cmd** 窗口 使用 cd 命令切换目录到 **C:\redis** 运行：

```go
redis-server.exe redis.windows.conf
redis-server.exe // 添加环境变量后可以省略

redis-cli.exe -h 127.0.0.1 -p 6379
set myKey abc

get myKey
```

