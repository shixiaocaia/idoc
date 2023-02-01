## 贪心

贪心算法一般分为如下四步：

- 将问题分解为若干个子问题
- 找出适合的贪心策略
- 求解每一个子问题的最优解
- 将局部最优解堆叠成全局最优解

其实这个分的有点细了，真正做题的时候很难分出这么详细的解题步骤，可能就是因为贪心的题目往往还和其他方面的知识混在一起。

## 例题

**[455. 分发饼干](https://leetcode.cn/problems/assign-cookies/)**

> 采用一个思路，小饼干喂饱小饼干的人，把大的留给胃口更大的，这样的全局思路，喂饱更多的人。

**[376. 摆动序列](https://leetcode.cn/problems/wiggle-subsequence/)**
> 实际上转换为了一个数值波峰序列，前后差值为正就是上坡，前后差值为负就是下坡。通知共有多个这样个上下的点。
>
> 贪心的情况即统计共有多少个峰值点即可，即也默认删除了一些中间没有正负变化点的点。
>
> 用一个变量记录前一个差值，即前一个的上下波动情况。

> DP:

**[53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/)**

> sum += nums[i]; //计算和
>
> ans = max(sum, ans); //每次都更新最值，因为可能当前为正，后面越来越小但是和依旧为正
>
> sum = max(0, sum); //如果当前和已经为负值了，对后面的序列都是负影响，不如直接从新开始。

> DP:

**[122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)**

> 赚的是差价。
>
> 计算相邻两天的差价，如果值为正说明前一次买今天赚，计算差值序列，统计所有正值情况即可。
>
> 如果持续为正收入差价即为正值差价和，如果否则就是前面正值。

**[55. 跳跃游戏](https://leetcode.cn/problems/jump-game/)**

> 每次贪心取极限，最后判断覆盖的范围能够包含末尾。
>
> 特判：如果只有一个点，那即终点。

**[45. 跳跃游戏 II](https://leetcode.cn/problems/jump-game-ii/)**

> 与上一题的区别，求最短的步数。局部最优是每一步尽可能走得远，全局最优是一步尽可能多走，继续往前走。
>
> 当我们当前这一步等于当前最远距离时：
>
> 1. 等于最远距离，跳出
> 2. 不等于，那么步数+1，更新最远距离继续向前走

**[1005. K 次取反后最大化的数组和](https://leetcode.cn/problems/maximize-sum-of-array-after-k-negations/)**
> 很容易想到对负值取反，剩余的取反次数给绝对值最小的数进行操作。
>
> 这里没有想到的一个点是对nums数组的取绝对值之和，从大到小排序，这样我们能够优先对负数最小值取负变正。如果还剩余次数，对绝对值最小的取负也是影响最小的。

**[134. 加油站](https://leetcode.cn/problems/gas-station)**
> 我们用 i, j 分别标记起点和终点，用 s 表示当前剩余汽油，而 cnt 表示当前行驶过的加油站数量。初始时，我们将起点设在最后一个位置，即 i=n-1。
>
> 开始行驶，移动 j。若发现当前剩余汽油小于 0，说明当前 i 作为起点不符合要求，我们将起点 i 循环左移，并且更新剩余汽油，直至剩余汽油是非负数。
>
> 当行驶过的加油站数量达到 n 时，结束。判断此时的剩余汽油是否非负，是则返回当前的 i 作为答案；否则返回 −1，表示无解。

```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        //从每个点作为起点出发
        for(int i = 0; i < gas.size(); i++){
            int tank = 0; //剩余油量
            int count = 0; //经过了几个加油站
            int current = i; //当前位置
            while(count < gas.size()){
                tank += gas[current]; //add oil
                if(tank < cost[current]) break; // cant go to next
                tank -= cost[current]; // go to next 
                current = (current + 1)% gas.size(); // loop the oil
                if(++count == gas.size()) return i;
            }
            // 执行完上述的while循环以后
            // 1. current < i 时候说明终点小于起点位置，已经i后面的几种情况不用遍历了
            // 2. 其他情况下，current目前处于无法前往的下一站，在这之前到达此站一定是tank >= 0 情况，所以从i 到curent之间的加油站肯定无法作为起始站点
            //    毕竟早一个站点开始一定多出一部分油量，或者为0
            if(current < i) break;
            else i = current;
        }
        return -1;
    }
};
```

**[135. 分发糖果](https://leetcode.cn/problems/candy/)**

> Hard。
>
> 分两次遍历找寻答案，第一遍前序，第二遍后续。
>
> 第一遍保证右边大于左边，第二遍后续遍历才能保证可以使用之前的顺序性。
>
> 反向遍历时，保证candy[i] > candy[ i + 1], 取 candy [i] = max(candy[i], candy [ i + 1] + 1), 这样也能保证前序的大小关系。

**[860. 柠檬水找零](https://leetcode.cn/problems/lemonade-change/)**

> 以为有什么特殊贪心，实际就是最优化给20找零的情况，5美元是公用的。

**[406. 根据身高重建队列](https://leetcode.cn/problems/queue-reconstruction-by-height/)**

>想到要按照一定的顺序的排序。没有A出。
>
>这题联系135，相当于需要维护两个权度。可以先考虑一方面，再去维护另一个方面。
>
>如果先将身高排序，同身高再按照k小的排，那么一定可以保证后面按照排序后的直接进行插入。
>
>此时身高高，且比他们高的人少，不会产生冲突。

**[452. 用最少数量的箭引爆气球](https://leetcode.cn/problems/minimum-number-of-arrows-to-burst-balloons/)**

> 如果这个气球能被上一箭射中，就跳过，否则 + 1，但是右边界需要不断维护最小的。

**[435. 无重叠区间](https://leetcode.cn/problems/non-overlapping-intervals/description/)**

> 计算去除交叉区间 == 总区间 - 计算不交叉区间
>
> 计算不交叉区间，考虑排序判断边界，这里考虑右边界排序，然后从左向右遍历，选择左边界尽可能小的，腾出空间给后面的。

**[763. 划分字母区间](https://leetcode.cn/problems/partition-labels/description/)**

> 本来想的联系上一题，计算每个字母的左右边界，来考虑，发现不可行。
>
> 先计算每一个字母的最远边界，然后不断更新一个区间内某个字母的最远位置，当此时下标等于这个区间最远位置字母的位置时，说明这是一个划分区间，再记录下此时的值作为左边界，最后区间长度做差即可得到。

**[738.单调递增的数字](https://leetcode.cn/problems/monotone-increasing-digits/)**

> 能想到一位位判断每个位置的数，但是剩下的就一头雾水了。
>
> 题解是从后向前判断数字的递增性，如果strNum[i - 1] > strNum[i]的话，就strNum[i - 1] - 1,而 strNum[i] 一维置 9。先把递增行维护好，最后一次性置9.
>
> 这里有两个重要的函数，stoi和to_string。

**[738.单调递增的数字](https://leetcode.cn/problems/binary-tree-cameras/description/)**

>遍历顺序是后续，左右中。
>
>然后考虑用数字标记，0，没有覆盖，1 放摄像头，2被覆盖。
>
>后又考虑怎么放摄像头比较好，从叶子节点看，应该尽可能给叶子节点父节点放，如果在叶子节点放会造成浪费。
>
>1. 左右节点都有覆盖，那么这个节点就是无覆盖
>2. 左右节点至少有一个无覆盖，那么应该放摄像头
>3. 左右节点至少有一个有摄像头，覆盖状态
>4. 头结点没有覆盖，最后特判下。

