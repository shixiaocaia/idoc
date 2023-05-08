Vim 备忘清单
===

入门
---------------

### 修改映射

```c
{
    "workbench.colorTheme": "Dracula",
    "editor.fontSize": 20,
    "editor.fontFamily": "JetBrains Mono, Consolas, 'Courier New', monospace",
    "editor.cursorSmoothCaretAnimation": "on",
    "editor.minimap.enabled": false,
    "editor.mouseWheelZoom": true,
    "remote.SSH.remotePlatform": {
        "Ubuntu-webserver": "linux"
    },
    "workbench.editorAssociations": {
        "*.swp": "default"
    },
    "workbench.iconTheme": "material-icon-theme",
    "editor.formatOnType": true,
    "cmake.configureOnOpen": true,
    "explorer.confirmDelete": false,
    "vim.insertModeKeyBindings": [
     {
        "before": ["j","j"],
        "after": ["<Esc>"]
     },
     ],
    "vim.leader": "<space>",
    "editor.accessibilitySupport": "off",
    "vim.easymotion": true,
    "vim.sneak": true, // 启用vim-sneak
    "vim.useSystemClipboard": true, //vim下粘贴
    "vim.useCtrlKeys": true,
    "vim.handleKeys":{
        "<C-c>": false,
        "<C-v>": false,
        "<C-w>": false
    },
}   
```

### 移动操作

:-| :-
:-| :-
`nh`/`j`/`k`/`l`      |        基本移动     
在标准模式按下 `i`     |              进入插入模式    
在插入模式按下`ESC`/ `jj` |              退出插入模式               
`gg` / `G`         |          前往第一行 / 最后一行          
`nw` / `ne`         |            向右移动一个单词的开头 / 结尾
`b`/`nb`           |    向左移动一个单词/向左移动n个单词     
`0` / `$`                 | 前往当前行第一个 / 最后一个字符  
`shift + [/]` | 移动到下一个空行 

### 删除操作

:-| :-
:-| :-
|         `x` / `X`         |                删除字符                 |
 |          `dw`            |                删除单词           |      
  |         `ndd`           |               删除当前行 / n 行        |       
 |`d$` | 从当前光标位置直到当前行末删除 |
 |`d2w/d2b` | 删除后两个单词 / 前两个单词 |

### 插入操作

:-| :-
:-| :-
`a`/`i`          | 在当前位置后面插入 / 前面插入 
`I` / `A`         |         在当前行开始 / 末尾插入         
`o` / `O`         |       在当前行下面 / 上面插入新行       
`u` / `<Ctrl> + r`     |               撤销 / 重做               
`:r TEST` | 插入文件内容 
`p` | 将最后一次删除的内容置入光标之后 
`shift + a` | 移动到本行末尾 insert 

### 撤销操作

:-| :-
:-| :-
| `u / U`  | 撤销以前的操作 / 撤销一行中的变动| 
| `CTRL-R` | 恢复之前的操作                    |

### 替换操作

:-| :-
:-| :-
 `r`  | 输入 r 和一个字符替换光标所在位置的字符   
 `ce` | 改变文本直到一个单词的末尾           
 `c$` | 用c搭配移动操作，比如替换光标到结尾的内容 
 `R` | 可连续替换多个字符。 

### :\<command>

:-| :-
:-| :-
| `:q` / `:quit` |       退出 vim，不作任何改动       |
|     `:q!`      |      退出 vim，丢弃已有的改动      |
|   `:wq`/`ZZ`   | 保存更改（write）并退出（quit）vim |

### 复制粘贴

:-| :-
:-| :-
| `v + y + p` | v进入可视模式，然后选择可以通过移动操作，然后y复制，p粘贴 |

### 注释操作

:-| :-
:-| :-
 `gcc` | 第一次注释本行，第二次取消注释 
 `gc3j` | 注释三行                       
 `gc}` | 注释到下一个}当中              


## 进阶

### 搜索

|:-||
|:-|--|
| `/RETURN VALUE` |在当前文件中查找该字符串|
| `n / N` |查找上一个字符串的上一个/下一个|
| `CTRL-O` `CTRL-I` |回退之前的，或者最新的位置|
| `%` |匹配同一行内的括号|


搜索替换
|:-||
|:-|--|
| `:#,#s/old/new/g` |替换 (#, #) 对应行|
| `:%s/old/new/g` |替换整个文件中的每个匹配串|
| `:%s/old/new/gc` |按需替换|

设置可使查找或者替换可忽略大小写的选项
|:-||
|:-|--|
| `:set ic / :set noic`        |设置忽略大小写查找|
| `:set hls / :set nohlsearch` |设置高亮显示|
| `:set is / :set nois`        |设置查找部分匹配|

### 定位
|:-||
|:-|--|
| `CTRL-G ` |显示当当前光标所在状态信息。|
| `27G/:17`           |跳转。|

### 使用帮助

|:-|:-|
|:-|--|
| `:help`                                    |打开帮助|
| `CTRL-W CTRL-W` |在不同窗口之间跳转|
| `:q`                   |退出帮助|

### 补全功能

```shell
1. 请确保 Vim 不是在以兼容模式运行： :set nocp

2. 查看一下当前目录下已经存在哪些文件，输入： :!ls   或者  :!dir

3. 现在输入一个目录的起始部分，例如输入： :e

4. 接着按 CTRL-D 键，Vim 会显示以 e 开始的命令的列表。

5. 然后按 <TAB> 键，Vim 会补全命令为 :edit 。

6. 现在添加一个空格，以及一个已有文件的文件名的起始部分，例如： :edit FIL

7. 接着按 <TAB> 键，Vim 会补全文件名(如果它是惟一匹配的)。
```


### :\<command>

| :-                       | :-                                          |
| :----------------------- | :------------------------------------------ |
| `:!ls / :!dir`           | :! 紧接着输入一个外部命令可以执行该外部命令 |
| `:!del TEST / :!rm TEST` | 删除当前文件夹下的TEST文件                  |
| `:w TEST`                | 会以 TEST 为文件名保存整个文件              |
| `:'<,'> w TEST`          | 保存文件的部分内容                          |
| ` :r TEST / :r !dir `    | 名为 TEST 的文件内容插入到当前位置          |
| `shift + v + >`          | 调整缩进                                    |
| `shift + v + ctrl + /`   | 注释                                       |

### EasyMotion

| :-                          | :-              |
| :-------------------------- | :-------------- |
| `<leader><leader> s c`      | 表示搜索字符`c` |
| `<leader><leader> f <char>` | 向后搜索        |
| `<leader><leader> F <char>` | 向前搜索        |

### Vim surround

| :-                           | :-   |
| :--------------------------- | :--- |
| `[operator]s[motion][symtol]` |      |
| `y s iw )`                  | 添加括号 |
| `c s ) ] ` | 更改括号为中括号 |
| `d s ]` | 删除括号 |
| `y s f r " ` | 从光标到r字符位置全部添加符号 |

### Vim sneak

## 打开文件

| :-                           | :-   |
| :--------------------------- | :--- |
| `ctrl + p` | 打开文件 |
| `gt / gT ` | 移动窗口 |

理解 Vim
---

### 动词理解

```shell
d  # 表示删除delete
r  # 表示替换replace
c  # 表示修改change
y  # 表示复制yank
v  # 表示选取visual select
```

动词代表了我们打算对文本进行什么样的操作

### 名词理解

```shell
w  # 表示一个单词word
s  # 表示一个句子sentence
p  # 表示一个段落paragraph
t  # 表示一个 HTML 标签tag
```

名词代表了我们即将处理的文本。引号或者各种括号所包含的文本称作一个文本块。

### 介词理解

```shell
i  # 表示在...之内 inside
a  # 表示环绕... around
t  # 表示到...位置前 to
f  # 表示到...位置上 forward
```

介词界定了待编辑文本的范围或者位置。

### 数词理解
数词指定了待编辑文本对象的数量，从这个角度而言，数词也可以看作是一种介词。引入数词之后，文本编辑命令的语法就升级成了下面这样：

```shell
动词 介词/数词 名词
```

下面是几个例子：

```shell
c3w  # 修改三个单词：change three words
d2w  # 删除两个单词：delete two words
```

另外，数词也可以修饰动词，表示将操作执行 `n` 次。于是，我们又有了下面的语法：

```shell
数词 动词 名词
```

示例

```shell
2dw # 两次删除单词(等价于删除两个单词): twice delete word
3x  # 三次删除字符(等价于删除三个字符): three times delete character
```

### 组词为句理解

有了这些基本的语言元素，我们就可以着手构造一些简单的命令了。文本编辑命令的基本语法如下：

```shell
动词 介词 名词
```

下面是一些例子

```shell
dip # 删除一个段落: delete inside paragraph
vis # 选取一个句子: visual select inside sentence
ciw # 修改一个单词: change inside word
caw # 修改一个单词: change around word
dtx # 删除文本直到字符“x”(不包括字符“x”): delete to x
dfx # 删除文本直到字符“x”(包括字符“x”): delete forward x
```
<!--rehype:className=wrap-text -->

另见
---

- 本地学习`vimtutor`内容
- [搞得像IDE一样的 Vim](https://jaywcjlove.github.io/vim-web) _(github.io)_
- [Vim 官方网站](http://www.vim.org/) _(vim.org)_
- [Devhints](https://devhints.io/vim) _(devhints.io)_
- [Vim cheatsheet](https://vim.rtorr.com/lang/zh_cn/) _(vim.rotrr.com)_
- [Vim documentation](http://vimdoc.sourceforge.net/htmldoc/) _(vimdoc.sourceforge.net)_
- [Interactive Vim tutorial](http://openvim.com/) _(openvim.com)_
