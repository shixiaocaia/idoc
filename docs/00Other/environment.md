环境配置
===

## iDoc环境

- [Node.js](http://nodejs.org/) (版本需不低于 14，建议使用 Node.js `14+` 及以上版本)
- 使用 npm 安装 idoc：`npm install -g idoc`

## VM_ubuntu 18.04

### 磁盘空间扩展问题

- 虚拟机设置中扩展磁盘空间

- 重新打开后黑屏

  - 进入ubuntu的bios模式进行选择CD启动，使用对象的ISO镜像文件，设备状态设置为`启动时连接`

  - 来不及选择BIOS界面，可以在虚拟机磁盘文件中，找到`（后缀为.vmx）`的文件

    ```bash
    bios.forcesetuponce=“TRUE”
    bios.bootdelay=“5000” # 延长时间
    ```

  - 重新启动虚拟机，进入BIOS设置界面，切换到Boot下，通过键盘上"Shift"+"="将CD-ROM Drive移到最上面。
  - 保存设置重新启动，进入系统重新分配
  - 重新进入系统，此时系统显示Welcom界面，选择Try Ubuntu
  - 搜索软件GParted，打开该软件，此时会显示新扩展的20G未分配空间
  - 重新启动，取消镜像文件的`启动时连接`

- [参考文章](https://www.jianshu.com/p/5c483f6b53ab)

## Docker

**docker必须部署在linux内核的系统上**，所以如果windows想安装,需要先安装一个linux虚拟机,然后再在虚拟机中运行，而wsl中安装Ubuntu就相当于安装了虚拟机，wsl没有linux环境就不能正确使用docker。

**网络问题**：`netsh winsock reset`

每次开机以管理员方式自动执行一次该命令。

**让所有程序都默认以管理员身份运行**

专业版系统具体步骤如下:

> 使用小娜搜索 secpol 或 “本地安全策略” （或运行 secpol.msc ），右键选择以管理员身份打开（或许需要）；
> 展开 本地策略，选择 安全选项，在右边找到“用户帐户控制：以管理员批准模式运行所有管理员”，双击它，将本地安全设置更改为“已禁用”；
> 然后重新启动计算机即可
> 完成操作后，通过 Win + R 执行命令 cmd 会发现输入框下面有一行小字”以管理员身份运行”

家庭版系统步骤如下(如果是家庭版用户没有组策略是无法像上述的专业版系统一样操作的):

> 打开注册表编辑器(运行 regedit)，展开注册表到 HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System ，选择项 System 后，在右侧找到 EnableLUA ，将其值更改为0；
> 然后重新启动计算机即可。
> 完成操作后，通过 Win + R 执行命令 cmd 会发现输入框下面有一行小字”以管理员身份运行”

**开机自动执行命令**

> win + r 打开命令行
> 输入 shell:startup
> 回车
> 进入一个文件夹
> 新建一个cmd脚本，如：netsh_winsock_reset.cmd，内容如下：
> `netsh winsock reset`

## Anaconda

- [Anaconda下载](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)，这里选择的是5.0（python对应3.6）

```bash
conda --version 

conda install pip   # 安装pip命令


conda upgrade --all # 所有工具包进行升级

```

- anaconda navigator启动时一直卡在 loading applications 页面

  - 在安装目录找到D:\anaconda\Lib\site-packages\anaconda_navigator\api
    然后打开conda_api.py，
    在1358行找到data = yaml.load(f)，将其改为data = yaml.safeload(f)
    猜测为保证代码的安全性，因为关闭防火墙也可以作为一个可行操作

  - 关闭防火墙

  - 管理员运行

  - 改

    - 按ctrl+alt+delete打开任务管理器 ，在进程里把python都结束。

    - 打开Anaconda  prompt ,输入anaconda-navigator,报错显示'str' object has no attribute 'get'（忘记截图了）

    - 去自己安装anaconda的路径下修改anaconda_api.py文件

    - 打开后做大概在800多行找到如下语句做如下修改保存。

      把versions=[vsdata.get('productVersion')],改成versions=["1b8e8302e405050205e69b59abb3559592bb9e60"],

      再次运行Anaconda navigator就可以正常打开了

- 管理虚拟环境



- 永久指定pip默认安装源
  直接在user目录中创建一个pip目录，如：C:\Users\用户名\pip,创建完后再pip 目 录下新建文件pip.ini，添加以下内容：

```bash
[gobal]

timeout = 6000

index-url = http://pypi.douban.com/simple/

trusted-host = pypi.douban.com
```

## VScode





### 配置C++

- 下载MinGW

  - [下载文件](https://sourceforge.net/projects/mingw-w64/files/)：进入网站后不要点击 "Download Lasted Version"，往下滑，找到最新版的 "x86_64-posix-seh"。
  - 解压到合适位置

- 配置环境变量：添加`mingw64\bin`到`Path`当中

  - `cmd`输入`g++`得到`g++: fatal error: no input files`

- .cpp文件配置C++环境

  - 进入调试界面添加配置环境，选择 C++(GDB/LLDB)，再选择 g++.exe，之后会自动生成 launch.json 配置文件
  - 编辑 launch.json 配置文件

  ```bash
  {
      // 使用 IntelliSense 了解相关属性。 
      // 悬停以查看现有属性的描述。
      // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
      "version": "0.2.0",
      "configurations": [
          {
              "name": "g++.exe - 生成和调试活动文件",
              "type": "cppdbg",
              "request": "launch",
              "program": "${fileDirname}\\${fileBasenameNoExtension}.exe",
              "args": [],
              "stopAtEntry": false,
              "cwd": "${fileDirname}",
              "environment": [],
              "externalConsole": true, // 修改此项为true,运行时可以弹出console终端
              "preLaunchTask": "task g++",
              "MIMode": "gdb",
              "miDebuggerPath": "C:\\SoftWare\\Code_env\\mingw64\\bin\\gdb.exe", //修改为对应的mingw64目录
              "setupCommands": [
                  {
                      "description": "为 gdb 启用整齐打印",
                      "text": "-enable-pretty-printing",
                      "ignoreFailures": true
                  }
              ],
          }
      ]
  }
  ```

  - 返回.cpp文件，按F5进行调试，会弹出找不到任务"task g++"，选择 "配置任务"，会自动生成 tasks.json 文件
  - 编辑 tasks.json 文件

  ```bash
  {
      "version": "2.0.0",
      "tasks": [
          {
              "type": "shell",
              "label": "task g++",
              "command": "C:\\SoftWare\\Code_env\\mingw64\\bin\\g++.exe", //更新g++路径
              "args": [
                  "-g",
                  "${file}",
                  "-o",
                  "${fileDirname}\\${fileBasenameNoExtension}.exe"
              ],
              "options": {
                  "cwd": "${workspaceFolder}"
              },
              "problemMatcher": [
                  "$gcc"
              ],
              "group": "build",
              "presentation": {
                  "panel": "shared"
              }
          }
      ]
  }
  ```

  

### 备份

