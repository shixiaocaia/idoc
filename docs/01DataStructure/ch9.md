动态规划
===

动态规划，英文：Dynamic Programming，简称DP，如果某一问题有很多重叠子问题，使用动态规划是最有效的。

所以动态规划中每一个状态一定是由上一个状态推导出来的，**这一点就区分于贪心**，贪心没有状态推导，而是从局部直接选最优的，同时这也是全局最优的。

### 步骤

1. 确定dp数组（dp table）以及下标的含义
2. 确定递推公式
3. dp数组如何初始化
4. 确定遍历顺序
5. 举例推导dp数组

**找问题的最好方式就是把dp数组打印出来，看看究竟是不是按照自己思路推导的！**

> [!NOTE]
>
> DP的题有哪些状态，比如买或者不买，状态怎么转变的。

### 例子

1. 确定dp数组（dp table）以及下标的含义

> dp[i] 表示第i个数的斐波那契数列数值

2. 确定递推公式

> 题目已给：dp[i] = dp[i-1] + dp[i-2]

3. dp数组如何初始化

> dp[0] = 0, dp[1] = 1;

4. 确定遍历顺序

> 从前向后遍历，因为后一项依赖前两项。

5. 举例推导dp数组

> 按照这个递推公式dp[i] = dp[i - 1] + dp[i - 2]，我们来推导一下，当N为10的时候，dp数组应该是如下的数列：
>
> 0 1 1 2 3 5 8 13 21 34 55
>
> 根据这个，可以打印输出判断是否正确。

```cpp
class Solution {
public:
    int fib(int n) {
        int dp[35];
        dp[0] = 0;
        dp[1] = 1;
        for(int i = 2; i <= n; i++){
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }
};
```

**优化空间写法**

```cpp
class Solution {
public:
    int climbStairs(int n) {
        if (n <= 1) return n;
        int dp[3];
        dp[1] = 1;
        dp[2] = 2;
        for (int i = 3; i <= n; i++) {
            int sum = dp[1] + dp[2];
            dp[1] = dp[2];
            dp[2] = sum;
        }
        return dp[2];
    }
};
```


## 01背包

**二维数组dp**

1. dp数组及其含义

`dp[i][j]`表示从0-i个物品中任意取重量为j得物品后，最大价值。

2. 确定递推表达式

也就是状态和选择，对于01背包来说，状态就是「背包的容量」和「可选择的物品」。

选择就是「装进背包」或者「不装进背包」。

```cpp
for 状态1 in 状态1的所有取值：
    for 状态2 in 状态2的所有取值：
        for ...
            dp[状态1][状态2][...] = 择优(选择1，选择2...)
```

注：下标是从1开始遍历，上一个物品的价值

**不放物品：**不放物品就是当前容量放不下，那么`dp[i][j] = dp[i-1][j]`，相当于和前面的最大值相同。

**放物品**：放物品是由当前不放，和放的最大值决定的。如果当前放了，那么就剩下的空间的最大存放价值为`dp[i-1][j - weight[i]]`，加上当前物品的价值，取最大值。即`dp[i][j] = max(dp[i-1][j], dp[i-1][j - weight[i]] + value[i])`。

3. 初始化dp数组

首先从`dp[i][j]`的定义出发，如果背包容量j为0的话，即`dp[i][0]`，无论是选取哪些物品，背包价值总和一定为0。

由递推表达式可以看出，是由前一个递推出来的，所以最开始的`dp[i-1][j]`，所以最开始的0要`dp[0][...]`需要初始化。

```cpp
dp[...][0] = 0;
dp[0][...] = 0;

//大小够存放第一个物品时价值，也是此时的最大值，注意dp数组的含义
for (int j = weight[0]; j <= bagweight; j++) {
    dp[0][j] = value[0];
}
```

4. 确定遍历顺序

先遍历物品，再遍历背包大小。

```cpp
// weight数组的大小 就是物品个数
for(int i = 1; i < weight.size(); i++) { // 遍历物品
    for(int j = 0; j <= bagweight; j++) { // 遍历背包容量
        if (j < weight[i]) dp[i][j] = dp[i - 1][j]; 
        else dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);

    }
}
```

5. 举例推导

> 01背包为什么一定是外层for循环遍历物品，内层for循环遍历背包容量且从后向前遍历！

---

**一维dp 01 背包**

1. 确定dp数组（dp table）以及下标的含义

在一维dp数组中，dp[j]表示：容量为j的背包，所背的物品价值可以最大为dp[j]。

2. 确定递推公式

```cpp
dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
```

3. dp数组如何初始化

dp[j]表示：容量为j的背包，所背的物品价值可以最大为dp[j]，那么dp[0]就应该是0，因为背包容量为0所背的物品的最大价值就是0。

**这样才能让dp数组在递归公式的过程中取的最大的价值，而不是被初始值覆盖了**。

那么我假设物品价值都是大于0的，所以dp数组初始化的时候，都初始为0就可以了。

4. 确定遍历顺序

```cpp
for(int i = 0; i < weight.size(); i++) { // 遍历物品
    for(int j = bagWeight; j >= weight[i]; j--) { // 遍历背包容量
        dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
	//倒序遍历，才能保证前一个值都后面一个值最优化无影响
    }
}
```

```cpp
void test_1_wei_bag_problem() {
    vector<int> weight = {1, 3, 4};
    vector<int> value = {15, 20, 30};
    int bagWeight = 4;

    // 初始化
    vector<int> dp(bagWeight + 1, 0);
    for(int i = 0; i < weight.size(); i++) { // 遍历物品
		cout << "weight:" << weight[i] << endl;
		for(int j = bagWeight; j >= weight[i]; j--) { // 遍历背包容量
            dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
			printf("dp[%d]: = %d\n", j, dp[j]);
		}
		cout << endl;
	}
    cout << dp[bagWeight] << endl;
}

int main() {
    test_1_wei_bag_problem();
	system("pause");
}
```

### 刷题

**[746. 使用最小花费爬楼梯](https://leetcode.cn/problems/min-cost-climbing-stairs/)**

> 根据五个步骤。
>
> `dp[i] = min(cost[i - 1] + dp[i - 1], cost[i - 2] + dp[i - 2]);`
>
> 初始化时，我们可以选择从0，1开始向上攀，从第i层向上攀时才需要耗费第i层的体力值，因此`dp[0]`和`dp[1]`都应该初始为0。

**[62. 不同路径](https://leetcode.cn/problems/unique-paths/)**

> 本科做过的题，注意初始化。
>
> 如果按照五步法的话，要注意最左一层，最上一层的初始。

**[63. 不同路径 II](https://leetcode.cn/problems/unique-paths-ii/)**

> 和上一题一样，再对有障碍物的地方做一个特判，如果当前位置有障碍物就清0。
>
> 此外要注意本题还将start处设置了障碍物，那肯定无法到达。

```cpp
vector<vector<int>> dp(m, vector<int>(n, 0)); // 初始化一个二维数组
```

**[🆙343. 整数拆分](https://leetcode.cn/problems/integer-break/)**

> 1. dp[i]表示 分拆数字i，可以得到的最大乘积为 dp[i]。
>
> 2. dp[i] 一种为 j * (i - j)，一种为j * dp[i - j] 是对 i - j 的再拆分至少两个数的最大值 `dp[i] = max(dp[i], max((i - j) * j, dp[i - j] * j));`
>
> 3. dp[0] dp[1] 就不应该初始化，也就是没有意义的数值。只初始化dp[2] = 1.
>
> 4. dp[i] 是依靠 dp[i - j]的状态，所以遍历i一定是从前向后遍历，先有dp[i - j]再有dp[i]。
>
>    枚举 j 的时候，是从1开始的。i 是从3开始，这样dp[i - j]就是dp[2]正好可以通过我们初始化的数值求出来。

> 用容器实现初始化，`int dp[n  + 1] = {0}`报错。

**[96. 不同的二叉搜索树](https://leetcode.cn/problems/unique-binary-search-trees/)**

> 做DP应该想到举例子递归后续的关系，才能写出递推关系式。
>
> 空树也是二叉搜索树，然后1也很明确，2也很明确，到3的时候就明白了，我以不同的值做节点的情况，左0右2，左1右1，左2右0。到这里子树在划分，就找到了递推关系式。
>
> dp[3]，就是 元素1为头结点搜索树的数量 + 元素2为头结点搜索树的数量 + 元素3为头结点搜索树的数量
>
> 元素1为头结点搜索树的数量 = 右子树有2个元素的搜索树数量 * 左子树有0个元素的搜索树数量
>
> 元素2为头结点搜索树的数量 = 右子树有1个元素的搜索树数量 * 左子树有1个元素的搜索树数量
>
> 元素3为头结点搜索树的数量 = 右子树有0个元素的搜索树数量 * 左子树有2个元素的搜索树数量
>
> 有2个元素的搜索树数量就是dp[2]。
>
> 有1个元素的搜索树数量就是dp[1]。
>
> 有0个元素的搜索树数量就是dp[0]。
>
> 所以dp[3] = dp[2] * dp[0] + dp[1] * dp[1] + dp[0] * dp[2]

**[416. 分割等和子集](https://leetcode.cn/problems/partition-equal-subset-sum/)**

> 两个数组和相等，转换为能分成两个相等的值，如果能找到一个背包存放的价值等于容量，即可。
>
> 这里物品的价值和占用体积是一个数值。
>
> 剪枝：如果这个数组的总和为奇数，那么必然无法平分为两个相等的值。

**[1049. 最后一块石头的重量 II](https://leetcode.cn/problems/last-stone-weight-ii/)**

> 还是01背包，关键怎么联想过去。
>
> 最后一块石头的重量：从一堆石头中,每次拿两块重量分别为x,y的石头,若x=y,则两块石头均粉碎;若x<y,两块石头变为一块重量为y-x的石头求最后剩下石头的最小重量(若没有剩下返回0)
>
> 问题转化为：把一堆石头分成两堆,求两堆石头重量差最小值。
>
> 进一步分析：要让差值小,两堆石头的重量都要接近sum/2;我们假设两堆分别为A,B,A<sum/2,B>sum/2,若A更接近sum/2,B也相应更接近sum/2。
>
> 进一步转化：将一堆stone放进最大容量为sum/2的背包,求放进去的石头的最大重量MaxWeight,最终答案即为sum-2*MaxWeight。
>
> 所以本题关联416

**[474. 一和零](https://leetcode.cn/problems/ones-and-zeroes/)**

> 这题本质上还是01背包的问题，可以用`dp[i][j]`表示 i 个 0 和 j 个1 的最大字串个数。
>
> 背包的遍历都是从后向前更新的。

## 完全背包

> 有N件物品和一个最多能背重量为W的背包。第i件物品的重量是weight[i]，得到的价值是value[i] 。**每件物品都有无限个（也就是可以放入背包多次）**，求解将哪些物品装入背包里物品价值总和最大。
>
> **完全背包和01背包问题唯一不同的地方就是，每种物品有无限件**。

01背包内嵌的循环是从大到小遍历，为了保证每个物品仅被添加一次。

而完全背包的物品是可以添加多次的，所以要从小到大去遍历。

```cpp
// 先遍历物品，再遍历背包
for(int i = 0; i < weight.size(); i++) { // 遍历物品
    for(int j = weight[i]; j <= bagWeight ; j++) { // 遍历背包容量
        dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);

    }
}
```

纯背包问题，是看能够凑成这个某个，否则要考虑组合还是排列问题，要注意遍历的顺序。

> **如果求组合数就是外层for循环遍历物品，内层for遍历背包**。
>
> **如果求排列数就是外层for遍历背包，内层for循环遍历物品**。

### 刷题

**[518. 零钱兑换 II](https://leetcode.cn/problems/coin-change-ii/)**

> dp递推式写错了。
>
> 能看出来这是一个完全背包的问题。
>
> dp[j]含义是能组合成j金额的方案数，那么dp[j]应该由dp[ j - coins[i]]推出来的。
>
> 初始化dp[0] = 1,这样才会对后续产生影响。

**[377. 组合总和 Ⅳ](https://leetcode.cn/problems/combination-sum-iv/)**

> 还是一个完全背包问题，是看排列的，因此外背包内物品。
>
> C++测试用例有两个数相加超过int的数据，所以需要在if里加上dp[i] < INT_MAX - dp[i - num]。
>
> 但java就不用考虑这个限制，java里的int也是四个字节吧，也有可能leetcode后台对不同语言的测试数据不一样。

**[322. 零钱兑换](https://leetcode.cn/problems/coin-change/)**

> 完全背包问题。
>
> 凑足总额为j - coins[i]的最少个数为dp[j - coins[i]]，那么只需要加上一个钱币coins[i]即dp[j - coins[i]] + 1就是dp[j]（考虑coins[i]）
>
> 所以dp[j] 要取所有 dp[j - coins[i]] + 1 中最小的。
>
> 递推公式：dp[j] = min(dp[j - coins[i]] + 1, dp[j]);
>
> dp[0] 组成0就是需要0个，其他值为了避免被初始值min覆盖，其他应该为INT_MAX。
>
> 且要判断前面dp值有过计算才能变更。

**[279. 完全平方数](https://leetcode.cn/problems/perfect-squares/)**

> 和322一样的思路。

**[139. 单词拆分](https://leetcode.cn/problems/word-break/)**

> 没有想到用哈希表，查找子串出现的问题。
>
> 题目中说了单词可以重复使用，也不用全部使用，因此这是一个完全背包问题。
>
> 背包的容量就是字符串的长度，物品就是wordDict。
>
> 1. 确定dp数组以及下标的含义
>
> dp[i] : 字符串长度为i的话，dp[i]为true，表示可以拆分为一个或多个在字典中出现的单词。
>
> 2. 确定递推公式
>
> 如果确定dp[j] 是true，且 [j, i] 这个区间的子串出现在字典里，那么dp[i]一定是true。（j < i ）。
>
> 所以递推公式是 if([j, i] 这个区间的子串出现在字典里 && dp[j]是true) 那么 dp[i] = true。
>
> 3. dp数组如何初始化
>
> 从递归公式中可以看出，dp[i] 的状态依靠 dp[j]是否为true，那么dp[0]就是递归的根基，dp[0]一定要为true，否则递归下去后面都都是false了。
>
> 4. 确定遍历顺序
>
> 题目中说是拆分为一个或多个在字典中出现的单词，所以这是完全背包。这里应该考虑前后组合的顺序，因此应该先遍历背包再遍历物品，所以a a b和 b a a是不同的，应该当作排列背包容量在外层遍历。

## 多重背包

> 有N种物品和一个容量为V 的背包。第i种物品最多有Mi件可用，每件耗费的空间是Ci ，价值是Wi 。求解将哪些物品装入背包可使这些物品的耗费的空间 总和不超过背包容量，且价值总和最大。

把多件物品划分成多个重复的单件物品，就变成了01背包问题。

```cpp
void test_multi_pack() {
    vector<int> weight = {1, 3, 4};
    vector<int> value = {15, 20, 30};
    vector<int> nums = {2, 3, 2};
    int bagWeight = 10;
    for (int i = 0; i < nums.size(); i++) {
        while (nums[i] > 1) { // nums[i]保留到1，把其他物品都展开
            weight.push_back(weight[i]);
            value.push_back(value[i]);
            nums[i]--;
        }
    }

    vector<int> dp(bagWeight + 1, 0);
    for(int i = 0; i < weight.size(); i++) { // 遍历物品
        for(int j = bagWeight; j >= weight[i]; j--) { // 遍历背包容量
            dp[j] = max(dp[j], dp[j - weight[i]] + value[i]);
        }
        for (int j = 0; j <= bagWeight; j++) {
            cout << dp[j] << " ";
        }
        cout << endl;
    }
    cout << dp[bagWeight] << endl;

}
int main() {
    test_multi_pack();
}
```

## 其他刷题

**[198. 打家劫舍](https://leetcode.cn/problems/house-robber/)**

> 递归表达式想到了，上一个偷了，上一个没偷 + 当前的值。
>
> 所以要初始化 0 1这两个值，对于dp[0]肯定是偷了第一家的东西，对于dp[1]是0，1中选偷一个，对于第三个开始，来判断前两家的偷了或者没偷的情况。

**[213. 打家劫舍 II](https://leetcode.cn/problems/house-robber-ii/)**

> 对比上一题，形成了一个环形。分为三种情况讨论：
>
> 1. 头尾都不考虑
> 2. 考虑头
> 3. 考虑尾
>
> 实际上2，3 包含了第一种情况，因为考虑头时可以不选就变成了1，考虑尾时可以不选就变成了1，答案必定在2，3中产生，不可能同时出现。

**[337. 打家劫舍 III](https://leetcode.cn/problems/house-robber-iii/)**

> 暴力：后续遍历，分为偷父节点和不偷父节点，但是会超时，需要记录已记录的部分，进行剪枝。
>
> 树形DP：重刷一下。

**[121. 买卖股票的最佳时机](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/)**

> 暴力：尽可能在左侧找最低价格，在右侧找最高价格。
>
> DP:
>
> 1. `dp[i][j]`表示什么，`d[i][0]`表示第i天持有股票所得最多现金（负数） ，`dp[i][1]`表示第i天不持有股票所得最多现金。
> 2. 递推公式：`dp[i][0]`持有股票是昨天乃至之前保留的`dp[i-1][0]`，或者是今天新买的`-price[i]`。`dp[i][1]`前一天不持有股票有的钱， 我今天卖掉股票赚的钱`dp[i-1][0] + prices[i]`。都是取最大值。
> 3. 初始化：`dp[0][1]`表示不持有股票的肯定为0，`dp[0][0]`表示持有股票的最多现金，第一天买入`-prices[i]`。
> 4. 遍历顺序：从前向后

**[122. 买卖股票的最佳时机 II](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/)**

> 和上一题一样，只是递推公式改变。
>
> 前者是在找最低买入，最高买入。
>
> 这里可以多次买入卖出。
>
> `dp[i][0]`持有股票是昨天乃至之前保留的`dp[i-1][0]`，或者是今天新买的`dp[i-1][1]-price[i]`。`dp[i][1]`前一天不持有股票有的钱， 我今天卖掉股票赚的钱`dp[i-1][0] + prices[i]`。都是取最大值。

**[123. 买卖股票的最佳时机 III](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iii/)**

> 1. `dp[i][j]`表示第i天状态j所剩最大现金。拿到题想到这题有哪些状态，本题中每天的状态（操作）：0. 没有操作 1. 第一次买入 2. 第一次卖出 3. 第二次买入 4. 第二次卖出。
> 2. 递归公式
>
> ```cpp
> dp[i][0]
> dp[i][1] = max(dp[i-1][0] - prices[i], dp[i - 1][1]);
> // 第一次买入肯定在前面没买过，我现在买-prices[i],还要明白dp[i][1]可能是手持一个股票的
> dp[i][2] = max(dp[i-1][1] + prices[i], dp[i-1][2]);
> // 手持一股卖掉赚钱，和前面卖完的相比，
> dp[i][3] = max(dp[i-1][2] - prices[i], dp[i-1][3]);
> // 第一股卖完买一股，持有一股
> dp[i][4] = max(dp[i-1][3] + prices[i], dp[i-1][3]);
> // 手持第二股卖掉，和前面卖完的比赚的多
> ```
>
> 3. 初始化
>
> ```cpp
> dp[0][0] = 0;
> dp[0][1] -= prices[0];
> dp[0][2] = 0;
> dp[0][3] -= prices[0];
> // 假设今天买入买出了，进行第二次购入
> dp[0][4] = 0;
> ```
>
> 4. 遍历顺序：从前向后
>
> 第二次写的时候忽略了，第一次买建立在前一天没有动作前提。

**[188. 买卖股票的最佳时机 IV](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-iv/)**

> 同上，上一题是k = 2 的特例，最上一题是  k  = 1的特例.

**🆙[309. 最佳买卖股票时机含冷冻期](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-cooldown/)**

> 改用数组表示
>
> dp\[0\]\[0]：表示买入，买入只能保持，或者前一天空仓
>
> dp\[0\]\[1]：表示卖出，卖出只能保持，或者前一天买入
>
> dp\[0\]\[2]：表示空参，空参只能保持，或者前一天卖出

**[714. 买卖股票的最佳时机含手续费](https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/)**

> ```cpp
> dp[i][0] = max(dp[i - 1][0], dp[i-1][1] - prices[i]);
>//前一天有股票，前一天卖完买股票
> dp[i][1] = max(dp[i - 1][1], dp[i-1][0] + prices[i] - fee);
> //前一天卖完了，前一天买了今天买再扣除fee
> ```
> 

**[300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/)**

> 1. `dp[i]`表示i之前包括i的以nums[i]结尾**最长**上升子序列的长度。
>
> 2. 递归公式
>
>    求[0, i - 1]之间的最长递增子序列，+ 1，不断更新每个位置的最长递增子序列长度。
>
> 3. 初始化每个数都为1，因为以他本身的数起始，至少为1。
>
> 4. 遍历顺序：从前向后。
>
> 注意需要不断记录最大值，因为在中间可能会中断，需要更新最大值。
>
> 单层循环肯定不行，不能保证之前序列的末尾值大小。

**[674. 最长连续递增序列](https://leetcode.cn/problems/longest-continuous-increasing-subsequence/)**

> 相比上一题，多了一个连续的要求。
>
> 可以贪心判断，count ++ ，断连续就重置为1.
>
> dp[i]表示以num[i] 为结尾，直接递归判断即可，如果大于就是在上一个基础上+1，否则就是维持本身的大小1即可。

**[718. 最长重复子数组](https://leetcode.cn/problems/maximum-length-of-repeated-subarray/)**

> 和上一题类似，二维情况

**🆙[1143. 最长公共子序列](https://leetcode.cn/problems/longest-common-subsequence/)**

> 非连续的最长公共子序列。
>
> 二维dp数组表示[0, i - 1] text1和[0, j - 1] text2之间的最长字串。
>
> 如果text1[i - 1] == text2[j - 1] 肯定是在这个基础上 + 1
>
> 如果不相等，就是`max(dp[i - 1][j], dp[i][j - 1])`。

**[1035.不相交的线](https://leetcode.cn/problems/uncrossed-lines/)**

> 同上。换汤不换药。

**[53. 最大子序和](https://leetcode.cn/problems/maximum-subarray/description/)**

> 一开始用贪心做，这里是DP。
>
> DP想递推公式含义，要么dp[i - 1] + nums[i]，要么是从当前位置开始。

**[392. 判断子序列](https://leetcode.cn/problems/is-subsequence/description/)**

> 同718，1143的思路，只要判断最长的情况是否等于s的长度，就可以判断是不是子串了。

**[115.不同的子序列](https://leetcode.cn/problems/distinct-subsequences/)**

> 1. `dp[i][j]`：以i-1为结尾的s子序列中出现以j-1为结尾的t的个数为`dp[i][j]`。
> 1. 递推公式
>
> ```cpp
> //s[i - 1] 与 t[j - 1]相等
> dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
> //一部分由s[i - 1]匹配，一部分不由s[i - 1]匹配。
> 
> //当s[i - 1] 与 t[j - 1]不相等时，dp[i][j]只有一部分组成，不用s[i - 1]来匹配，即：dp[i - 1][j]
> dp[i][j] = dp[i - 1][j];
> ```
>
> 3. 初始化
>
> ```cpp
> dp[i][0]表示什么呢？
> 
> dp[i][0] 表示：以i-1为结尾的s可以随便删除元素，出现空字符串的个数。
> 
> 那么dp[i][0]一定都是1，因为也就是把以i-1为结尾的s，删除所有元素，出现空字符串的个数就是1。
> 
> 再来看dp[0][j]，dp[0][j]：空字符串s可以随便删除元素，出现以j-1为结尾的字符串t的个数。
> 
> 那么dp[0][j]一定都是0，s如论如何也变成不了t。
> 
> 最后就要看一个特殊位置了，即：dp[0][0] 应该是多少。
> 
> dp[0][0]应该是1，空字符串s，可以删除0个元素，变成空字符串t。
> ```
>
> 4. 从前向后
> 5. 注：答案的溢出问题。

**[583. 两个字符串的删除操作](https://leetcode.cn/problems/delete-operation-for-two-strings/)**

> 同上面，考虑删除任意一部分，或者二者都删除。如果相等就等于前者，相当于没有操作。
>
> 注意初始化问题。

**[72. 编辑距离](https://leetcode.cn/problems/edit-distance/)**

> 同上583考虑
>
> ```cpp
> word1[i - 1] == word[i - 2];
> dp[i][j] = dp[i-1][j-1];//not opearte
> 
> word1[i - 1] != word[i - 2];
> dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + 1; //删除word1，或者word2一个字符使之匹配
> dp[i][j] = dp[i-1][j-1] + 2;//各自删除一个字符使之匹配，此时不可能是最优解，所以不考虑
> 
> dp[i][j] = dp[i-1][j-1] + 1;//替换一个字符，此时不用增加元素，那么以下标i-2为结尾的word1 与 j-2为结尾的word2的最近编辑距离 加上一个替换元素的操作。
> ```

**[647. 回文子串](https://leetcode.cn/problems/palindromic-substrings/)**

> 如何判断回文子串：
>
> 1. i == j 单个字符肯定是。
> 2. j - i = 1 aba 也是
> 3. j- i > 1需要判断[i + 1, j - 1]中间是不是回文子串。
>
> 在第三种情况，推出我们需要考虑递归顺序了，应该从下向上，从左到右。
>
> 关联[5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring)

**[516. 最长回文子序列](https://leetcode.cn/problems/longest-palindromic-subsequence/)**

> `dp[i][j]`表示[i,j]的最长回文串
>
> 1. s i == s j时，表示首尾都可以加入，aXXXXa, ans + 2
> 2. s i != s j 时， aXXXXb,  重新判断 XXXXb，或者aXXXXb的长度
>
> 由递归公式可以看出需要从下向上，从左到右遍历。
>
> 同时 无法遍历到的 i == j情况，需要手动初始化，即单个字符是回文串的情况。

[64. 最小路径和](https://leetcode.cn/problems/minimum-path-sum)

> 模板题。

[221. 最大正方形](https://leetcode.cn/problems/maximal-square)

> 主要是没有理解这里dp数组的含义，表示当前当前位置可围成的正方形的边长。
>
> 转移方程，当前字符是1时，可以由上方，左上方，左方的最小值决定（木桶效应），此外当`i == 0 || j == 0`，显然只能为1。当前字符为0时，肯定为0。
