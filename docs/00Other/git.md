Git
===

## 安装

```bash
# 配置用户信息
git config --global user.name "runoob"
git config --global user.email test@runoob.com
git config --list

# 设置全局代理
git config --global http.proxy socks5://127.0.0.1:10808
git config --global https.proxy socks5://127.0.0.1:10808

# 配置SSH
ssh-keygen -t rsa -C "这里换上你的邮箱"
# 不需要密码，直接三次回车
# 生成id_rsa和id_rsa.pub
# 添加公钥pub文件内容，到Settings -- SSH and GPG keys
# 测试配置成功
ssh -T git@github.com 

# 输入yes
The authenticity of host 'github.com (20.205.243.166)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes

Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
Hi shixiaocaia! You've successfully authenticated, but GitHub does not provide shell access.

# 登录信息
Username for 'https://github.com'  # 完整的邮箱
password # access key
```

## 主体思路

![无标题-2023-04-17-1505](http://pic.shixiaocaia.fun//%E6%97%A0%E6%A0%87%E9%A2%98-2023-04-17-1505.png)

- 注意整体流程中的，合并过程的对比过程

```bash
git status # 查看状态信息
git log    # 查看提交信息

.gitignore # 添加忽略的信息

git merge test # 将test分支和当前分支进行合并
```

- 实际中在主分支下创建分支，会复制其内容到子分支当中，除了gitignore中的文件是相互分离的，完成后，进行相关分支的合并操作
- dowmload和clone的文件相比，没有相应的git操作信息

## 连接远程仓库

```bash
git init
git remote add orgin url

# ssh连接，不需要登陆验证
git remote rm origin 
git remote add origin git@....git

# 带access的输入
git remote set-url origin  https://GITHUB ACCESS@github.com/nlp-greyfoss/typora_notes.git/

# http连接，需要登陆验证
https://github.com/deepthan/Front-end-resource-collection/issues/28

git add .
git commit -m"update"
git branch -m main
git push origin main
```

## 先commit再pull再push

git中向远程仓库中提交代码时一定要先pull再push，本地代码进行commit后，仓库不会将本地代码与远程仓库的代码进行比较，不会识别出是否存在代码冲突，必须进行pull命令后，才会将本地代码与远程仓库的代码进行比较，如果两者的代码存在冲突，必须要解决冲突后重新commit ----> pull ----> push。

如果不存在冲突，则会在pull时直接合并代码，并不会将本地的代码覆盖掉。

因此正确操作

```bash
git add.
git commit -m"build"
git pull origin main
git push origin main
```

## 关于分支

```bash
git branch     # 查看本地分支
git branch -r  # 查看远程分支
git branch -a  # 查看所有分支

git checkout [branch_name] # 切换分支

git branch -d local_branch_name # 删除本地分支
git push origin :[branch name]  # 删除远程分支，：表示删除

git branch [branch_name] # 本地创建新的分支，文件来源于主分支的内容

git reflog --date=local | grep <branchname> # 查看分支属于哪部分拉出来的
```

## 版本控制

在做MIT 6.S081时候，git clone源代码后发现看不到任何内容，应该是当前下载的分支没有代码。

### 我是个傻叉

拉取仓库所有代码后，需要切换到相应的分支才能看到对应分支的内容。

```bash
$ git branch -a
* master
  remotes/origin/HEAD -> origin/master
  remotes/origin/cow
  remotes/origin/fs
  remotes/origin/lazy
  remotes/origin/lock
  remotes/origin/master
  remotes/origin/mmap
  remotes/origin/net
  remotes/origin/pgtbl
  remotes/origin/riscv
  remotes/origin/syscall
  remotes/origin/thread
  remotes/origin/traps
  remotes/origin/util
```

```bash
$ git checkout origin/util
Note: switching to 'origin/util'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at 40db4f0 wfi to save CPU time on Athena
```

我们可以看到通过一个`head`指针操作当前指向的分支。

### 添加git仓库地址

```bash
$ cat .git/config
[core]
        repositoryformatversion = 0
        filemode = false
        bare = false
        logallrefupdates = true
        symlinks = false
        ignorecase = true
[remote "origin"]
        url = git://g.csail.mit.edu/xv6-labs-2020
        fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
        remote = origin
        merge = refs/heads/master
```

通过看到config文件，origin远程主机名并不是我们的（拉取的，对比自己的仓库是不同的），需要使用其他主机名对应到自己的仓库地址当中。

```bash
git remote add [remote_name] [your_own_link]

$ cat .git/config
```

### push

将本地分支版本上传远程并合并

```bash
git push <remote_name> <local_branch_name>:<remote_branch_name>

# 当用的自己的仓库时，origin就是自己的，那么
git push origin <local_branch_name>:<remote_branch_name>

# 当远程分支和本地分支同名时
git push github util:util
git push github util
```

### 创建测试分支

```bash
git checkout util         # 切换到util分支
git checkout -b util_test # 建立并切换到util的测试分支
```

当你在`util_test`分支中每测试通过一个作业，请提交（`git commit`）你的代码，并将所做的修改合并（`git merge`）到`util`中，然后提交（`git push`）到github.

```bash
git add .
git commit -m "完成了第一个作业"
git checkout util
git merge util_test
git push github util:util
```

> 为什么创建util_test后，文件夹里还是util内容
>
> - 此时util_test和util是隔离的吗
> - 因为util_test还是本地分支内容

**因此，需要每次push时候要注意是在使用什么分支，上传到哪一个分支里，和哪一个分支合并。**

## 分支切换问题

**Please commit your changes or stash them before you switch branches.**

- 使用`git stash`暂存当前分支
- 切换到主分支的其他分支当中
  - `git status`发现没有需要提交的部分
- 修改完分支，返回原来的dev分支
  - `git checkout dev`切换到dev分支，`git status`发现没有东西需要提交，`git stash list`查看之前暂存的列表
  - `git stash apply`恢复，但是stash并没有删除，`git stash drop stash@XXXX`，在尾部加上id
  - 或者使用`git stash pop`恢复存储当中的内容，并且删除存储内容
  - 这时候`git status`可以看到有改动未提交

## fatal: refusing to merge unrelated histories

- 根本原因

因为两个根本不相干的 git 库， 一个是本地库， 一个是远端库， 然后本地要去推送到远端， 远端觉得这个本地库跟自己不相干， 所以告知无法合并

- 解决方案一

git clone远程仓库到本地，将需要推送的内容放到该仓库下 ， 然后提交上去 ， 这样算是一次update操作

- 解决方案二

使用强制命令

git pull origin master --allow-unrelated-historie 

后面加上 --allow-unrelated-histories  ， 把两段不相干的分支进行强行合；这里可能会进入一个编辑页面，只需要先ESC，然后敲:q! 即可

后面再push就可以了 git push -u origin master git
