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
