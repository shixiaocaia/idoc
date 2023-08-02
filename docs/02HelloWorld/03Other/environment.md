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



## 服务器上

- sudo切换：`sudo passwd root`，`su`
- yum安装：`yum -y install yum-utils`
- vim安装：`yum -y install vim-enhanced`
- git安装：https://www.runoob.com/git/git-install-setup.html

---

### goland环境配置

```shell
yum install golang

wget  https://dl.google.com/go/go1.17.2.linux-amd64.tar.gz
tar -zxf go1.17.2.linux-amd64.tar.gz -C /usr/local

vim /etc/profile

export GO111MODULE=on
export GOROOT=/usr/local/go
export GOPATH=/home/gopath
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin

source /etc/profile

go env -w GOPROXY=https://goproxy.cn,direct

go version
```

