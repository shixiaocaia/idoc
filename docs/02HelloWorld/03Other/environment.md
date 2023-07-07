环境配置
===

## iDoc环境

- [Node.js](http://nodejs.org/) (版本需不低于 14，建议使用 Node.js `14+` 及以上版本)
- 使用 npm 安装 idoc：`npm install -g idoc`


## Go

1. 下载安装包

2. 环境变量配置，使得所有代码布置到指定的GOPATH目录下


```bash
go version
go env
# 查看配置环境

# 配置代理
go env  -w GOPROXY=https://goproxy.cn,https://goproxy.io,direct

# Go Moudle
go env -w GO111MODULE=on

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

