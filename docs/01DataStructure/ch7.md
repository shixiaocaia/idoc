回溯
===

**确认函数模板返回值以及参数**

一般回溯算法的返回值为void，参数根据需要填写。

**回溯函数终止条件**

找到能满足答案情况时，存放答案，并结束本层的递归。

**回溯搜索的遍历过程**

```cpp
void dfs(XXX, int index){
    if(){
        加入答案；
        return;
    }
    
    for (选择：本层集合中元素（树中节点孩子的数量就是集合的大小）) {
        if(...) 去重;
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
    }    
}
```

## 例题

**[LC77. 组合](https://leetcode.cn/problems/combinations/)**

> 在本科竞赛时，经常暴力写到的DFS，BFS，其本质也是递归。参数包括本身的n，k，再增加一个起始坐标，标记前面已经使用的数字，间接去重。终止条件是已经找到k个数，通过数组的长度判断。遍历过程就是不断放入一个数，继续递归下一个树，然后回退这个数。
>
> 剪枝：当起始位置开始可以选的数数量小于所需的时候，跳出。
>
> 当前已选的数：path.size()
>
> 剩余可选的数：n - startindex + 1
>
> 还需要选的数：k - path.size()
>
> 所以开始的位置必须 k - path.size() >=  n - startindex + 1 即startindex >= n - k + path.size() + 1

**[216. 组合总和 III](https://leetcode.cn/problems/combination-sum-iii/)**

> DFS模板题，剪枝也和上一题思路差不多

**[17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)**

> 题解思路，用一个字符串常量 ，映射每个字符串组，再将每个字符

**[39. 组合总和](https://leetcode.cn/problems/combination-sum/)**

> 考虑去重，需要加一个起始坐标index，求组合数而不是排列数。
>
> 由于同一个数字可以拿多个，所以每次更新index从当前的i更新。

**[🆙40. 组合总和 II](https://leetcode.cn/problems/combination-sum-ii/)**

> 对比上题，这题每个数只能使用一次了，但不是这么简单。
>
> 要考虑数字重复出现，有两个 1 的情况下， 1 + 1 + 6 = 8 也是可以的。
>
> 因此本题的重点在于去重，一开始我考虑了candidates[i] == candidates[i - 1] ，如果这个数和上次放入一样跳过，那么1 1 6就会被排除，看了题解一句话，我们要去重的是同层的遍历相同的数字情况，比如，我 1 2（第一个2）遍历，和 1 2（第二个2）开始遍历，就是重复的，但是1 2 2这种是可以的，因此要加一个判断当前位置是不是新的一层的开头。

**[🆙131. 分割回文串](https://leetcode.cn/problems/palindrome-partitioning/)**

> 分割字符串，如果当前子串是回文串就进行下一层遍历，否则继续截取更长的子串长度。

**[🆙93. 复原 IP 地址](https://leetcode.cn/problems/restore-ip-addresses/)**

>stoi(  )函数，头文件：#include<cstring> 把数字字符串转换成int输出。
>
>字串截取，每次处理完，也把s截取为处理完的字符串。
>
>当处理完第四段，如果s为空即找到一组答案，否则弹出。

**[78. 子集](https://leetcode.cn/problems/subsets/)**

> 模板题，每一次超出可选范围时跳出即可。

**[90. 子集 II](https://leetcode.cn/problems/subsets-ii/)**

> 模板题，对比前面的有一题思路相同，我们要去重的是同一层填入相同的数。

**[491. 递增子序列](https://leetcode.cn/problems/increasing-subsequences/)**

> remake
>
> 第一遍卡在了去重。
>
> 随想录思路：先处理continue的条件，加上unset去重。

**[46. 全排列](https://leetcode.cn/problems/permutations/)**

> DFS模板题，每一次遍历所有的数组，并判断这个数是否被使用过，没有的话填入，最后如果vec数组的大小等于nums数组大小，为一种情况。

**[47. 全排列 II](https://leetcode.cn/problems/permutations-ii/)**

> 对比46题，本题中需要增加去重的操作，如果这个数和上一个数相同，并且是未使用的，说明是同层的数，并且未被使用过，肯定是同层已经遍历完的，用这个可以判断是不是同层的结点。

**[🆙332. 重新安排行程](https://leetcode.cn/problems/reconstruct-itinerary/)**

> Hard 题。
>
> 如果选择正确的容器来映射关系。
>
> 以及注意如何正确初始化一个二维数组：
>
>  vector<vector<string>> exp{
>     {"MUC", "LHR"}, 
>      {"JFK", "MUC"}, 
>     {"SFO", "SJC"}, 
>         {"LHR", "SFO"} 
>     };

**[🆙51. N 皇后](https://leetcode.cn/problems/n-queens/)**

> 自己写的时候，思路还是不够清晰，纠结以下的点，挨个挨个遍历，实际上，每行只能放一个，dfs每一行，再遍历一行的点即可。
>
> check时候，行和列都没问题。怎么检索对角线，要分为左斜和右斜
>
> 二刷没问题，学习使用vector写二维数组以及初始化。

**[🆙37. 解数独](https://leetcode.cn/problems/sudoku-solver/)**

> Hard 题，双层递归，终止条件判断。
>
> 一个个填写，填满找到答案。
>
> 二刷通过，当时卡了一下vector的二维数组`vector<vector<char>> board`，用`board.size()`则得出行向量的维度，即这个表的行数，`board[0].size()`表明一个行向量的维度，即由多少列。
>
> 注意这题的返回值是bool，而不是具体数值。

[200. 岛屿数量](https://leetcode.cn/problems/number-of-islands)

> BFS模板题。

[22. 括号生成](https://leetcode.cn/problems/generate-parentheses)

> DFS。
