回溯
===
## 写点什么

- 如何**去重**
  - 排序，相邻数重复使用过的，进行去重
  - 不能排序的，有序的问题，那么就要哈希表标记已经使用过的数了
- **划分子问题**，比如IP地址和回文串，判断每一部分是否合法，再进行递归

## 例题

[77. 组合](https://leetcode.cn/problems/combinations/)

[216. 组合总和 III](https://leetcode.cn/problems/combination-sum-iii/)

**[17. 电话号码的字母组合](https://leetcode.cn/problems/letter-combinations-of-a-phone-number/)**

[39. 组合总和](https://leetcode.cn/problems/combination-sum/)

[40. 组合总和 II](https://leetcode.cn/problems/combination-sum-ii/)

**[131. 分割回文串](https://leetcode.cn/problems/palindrome-partitioning/)**

**[93. 复原 IP 地址](https://leetcode.cn/problems/restore-ip-addresses/)**

> 常见API熟悉使用。

[78. 子集](https://leetcode.cn/problems/subsets/)

[90. 子集 II](https://leetcode.cn/problems/subsets-ii/)

**[491. 递增子序列](https://leetcode.cn/problems/increasing-subsequences/)**

[46. 全排列](https://leetcode.cn/problems/permutations/)

**[47. 全排列 II](https://leetcode.cn/problems/permutations-ii/)**

> 是否会重复：当前递归下，上一个数未使用，必然进入了递归，当前数等于上一个数，再进入递归必然重复
>
> 如何去重：
>
> - 先排序，使得重复数相邻
> - 判断上一个数是否使用过，如果使用过说明在不同递归层

[332. 重新安排行程](https://leetcode.cn/problems/reconstruct-itinerary/)

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

[51. N 皇后](https://leetcode.cn/problems/n-queens/)

> 自己写的时候，思路还是不够清晰，纠结以下的点，挨个挨个遍历，实际上，每行只能放一个，dfs每一行，再遍历一行的点即可。
>
> check时候，行和列都没问题。怎么检索对角线，要分为左斜和右斜
>
> 二刷没问题，学习使用vector写二维数组以及初始化。

[37. 解数独](https://leetcode.cn/problems/sudoku-solver/)

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

[剑指 Offer 12. 矩阵中的路径](https://leetcode.cn/problems/ju-zhen-zhong-de-lu-jing-lcof/?envType=study-plan&id=lcof&plan=lcof&plan_progress=fi7d972)
