Docker
===

## README

- [CSDN参考文档1](https://blog.csdn.net/qq_39611230/article/details/108641842)

## 是什么



## 环境安装

**docker必须部署在linux内核的系统上**，所以如果windows想安装,需要先安装一个linux虚拟机,然后再在虚拟机中运行，而wsl中安装Ubuntu就相当于安装了虚拟机，wsl没有linux环境就不能正确使用docker。

**网络问题**：`netsh winsock reset`

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