Docker
===

## README

- [WSL安装](https://deepinout.com/wsl-tutorials/wsl-install-and-quick-start.html)
- 除了上述文档的配置，注意进入BIOS打开主板的虚拟化
- `wsl --update`
- `wsl --shutdown`关闭WSL

---

- [Docker从入门到实践](https://yeasy.gitbook.io/docker_practice/)

## 基本命令

```bash
# 查看当前的容器
docker ps -as

# 启动容器
docker container start 容器名或者容器id

# 停止容器
docker container stop 容器名或容器id
# 或可简写为
docker stop 容器名或容器id

# 强制关闭容器
docker container kill 容器名或容器id
# 或可简写为
docker kill 容器名或容器id
```

## 常用容器

### MySQL

1. 拉去镜像：`docker pull mysql`，默认最新。
2. 运行容器：`docker run -itd --name mysql-test -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql`



### Redis



## 问题

### WSL2 Vmmem内存

1.按下`Windows + R`键，输入`%UserProfile%`并运行进入用户文件夹

2.新建文件`.wslconfig`，然后记事本编辑

3.填入以下内容并保存, memory为系统内存上限，这里我限制最大2GB，可根据自身电脑配置设置

```bash
[wsl2]
memory=4GB
swap=8GB
localhostForwarding=true
```

4.然后启动cmd命令提示符，输入`wsl --shutdown`来关闭当前的子系统