Docker
===

## 是什么





## 基本命令

```bash
# 停止容器
docker container stop 容器名或容器id
# 或可简写为
docker stop 容器名或容器id

# 强制关闭容器
docker container kill 容器名或容器id
# 或可简写为
docker kill 容器名或容器id

# 启动容器
docker container start 容器名或容器id
# 或可简写为
docker start 容器名或容器id
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