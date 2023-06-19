贪心
===

贪心算法一般分为如下四步：

- 将问题分解为若干个子问题
- 找出适合的贪心策略
- 求解每一个子问题的最优解
- 将局部最优解堆叠成全局最优解

其实这个分的有点细了，真正做题的时候很难分出这么详细的解题步骤，可能就是因为贪心的题目往往还和其他方面的知识混在一起。

## 例题

[455. 分发饼干](https://leetcode.cn/problems/assign-cookies/)

> 采用一个思路，小饼干喂饱小饼干的人，把大的留给胃口更大的，这样的全局思路，喂饱更多的人。

[376. 摆动序列](https://leetcode.cn/problems/wiggle-subsequence/) 

[53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)

**[122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)**

> 赚的是差价。
>
> 计算相邻两天的差价，如果值为正说明前一次买今天赚，计算差值序列，统计所有正值情况即可。
>
> 如果持续为正收入差价即为正值差价和，如果否则就是前面正值。

[55. 跳跃游戏](https://leetcode.cn/problems/jump-game/)

[56.合并区间](https://leetcode.cn/problems/merge-intervals/)

**[45. 跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/)**

> - 贪心：保证每一步尽可能走的远，并且这个题目保证可以到达最远的。
>   - 每次记录能到达的最远距离
>   - 每次选择最长的那一步，到达最长的，再走下一次最长的那一步
>   - 当这一步能到头，就跳出。
>   - next始终记录了能到达的最远距离，无论如何都包含了了终点
> - DP：到达i的最少次数，等于0~i - 1的步数 + 1
>   - dp[i]表示到底i位置的最小步数
>   - 转移条件：dp[i] = min(dp[i], dp[0~i-1]) + 1
>   - 初始化：dp[0] = 0
>   - 遍历顺序，从前到后

**[1005. K 次取反后最大化的数组和](https://leetcode.cn/problems/maximize-sum-of-array-after-k-negations/)**
> 很容易想到对负值取反，剩余的取反次数给绝对值最小的数进行操作。
>
> 这里没有想到的一个点是对nums数组的取绝对值之和，从大到小排序，这样我们能够优先对负数最小值取负变正。如果还剩余次数，对绝对值最小的取负也是影响最小的。

**[134. 加油站](https://leetcode.cn/problems/gas-station)**
> - 如果到达当前节点时，sum < 0，那么前面的节点也不可以。因为前面节点满足的条件是sum >=0，说明经过站点的油量至少是大于等于0的，所以肯定都不行了
>- 更新答案从下一起点开始，sum重0开始。
> - 没有答案：如果整体gas - cost 和小于0，从哪一个起点都不行

**[135. 分发糖果](https://leetcode.cn/problems/candy/)**

> 分两次遍历找寻答案，第一遍前序，第二遍后续。
>
> 第一遍保证右边大于左边，第二遍后续遍历才能保证可以使用之前的顺序性。
>
> 反向遍历时，保证candy[i] > candy[ i + 1], 取 candy [i] = max(candy[i], candy [ i + 1] + 1), 这样也能保证前序的大小关系。

**[406. 根据身高重建队列](https://leetcode.cn/problems/queue-reconstruction-by-height/)**

- 有个两个指标考虑，优先固定好其中一个进行排序考虑。
- 先固定从大到小排序h，同样h，优先k小在前
  - h大的必然h相对较小
- 遍历每个人h,k，将其插入到k位置

```Go
插入[7,0]：[[7,0]]
插入[7,1]：[[7,0],[7,1]]
插入[6,1]：[[7,0],[6,1],[7,1]]
插入[5,0]：[[5,0],[7,0],[6,1],[7,1]]
插入[5,2]：[[5,0],[7,0],[5,2],[6,1],[7,1]]
插入[4,4]：[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
```

- 插入[6,1]，后移[7,1]，将[6,1]插入到1这个位置，由于按照身高插入的，那么在[7,1]前面插入一个，不会影响他的k（数量还是前面有1个比他高的）
- 同样插入[5,0]，到0这个位置，不影响[7,0],[6,1],[7,1]

[452. 用最少数量的箭引爆气球](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)

> 维护一个最小的边界，每次更新这个边界，超过这个边界就 + 1

**[435. 无重叠区间](https://leetcode.cn/problems/non-overlapping-intervals/description/)**

> 计算去除交叉区间 == 总区间 - 计算不交叉区间
>
> 计算不交叉区间，考虑排序判断边界，这里考虑右边界排序，然后从左向右遍历，选择左边界尽可能小的，腾出空间给后面的。

**[763. 划分字母区间](https://leetcode.cn/problems/partition-labels/description/)**

> 1. 记录每个字母的最远位置，作为一个分割点
> 2. 遍历每个位置，当前字母的最远位置与当前位置重合，划分为一个区间。

**[738.单调递增的数字](https://leetcode.cn/problems/monotone-increasing-digits/)**

> 能想到一位位判断每个位置的数，但是剩下的就一头雾水了。
>
> 题解是从后向前判断数字的递增性，如果strNum[i - 1] > strNum[i]的话，就strNum[i - 1] - 1,而 strNum[i] 一维置 9。先把递增行维护好，最后一次性置9.
>
> 这里有两个重要的函数，stoi和to_string。

[665.非递减数列](https://leetcode.cn/problems/non-decreasing-array/description/)

> 每次看贪心题目都觉得自己是笨比。

