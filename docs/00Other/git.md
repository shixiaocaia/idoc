Git
===

## 连接远程仓库

```bash
git init
git remote add orgin url

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

