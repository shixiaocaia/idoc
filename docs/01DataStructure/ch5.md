栈与队列
===

**我们使用的stack是属于哪个版本的STL？**

C++标准库是有多个版本的，才能知道对应的栈和队列的实现原理。下面是三个最为普遍的STL版本：

1. HP STL 其他版本的C++ STL，一般是以HP STL为蓝本实现出来的，HP STL是C++ STL的第一个实现版本，而且开放源代码。
2. P.J.Plauger STL 由P.J.Plauger参照HP STL实现出来的，被Visual C++编译器所采用，不是开源的。
3. SGI STL 由Silicon Graphics Computer Systems公司参照HP STL实现，被Linux的C++编译器GCC所采用，SGI STL是开源软件，源码可读性甚高。

**基本功能**

栈提供push 和 pop 等等接口，所有元素必须符合先进后出规则，所以栈不提供走访功能，也不提供迭代器(iterator)。 不像是set 或者map 提供迭代器iterator来遍历所有元素。

**C++中stack 不是容器**

栈是以底层容器完成其所有的工作，对外提供统一的接口，底层容器是可插拔的（也就是说我们可以控制使用哪种容器来实现栈的功能）。

所以STL中栈往往不被归类为容器，而被归类为container adapter（容器适配器）。

我们常用的SGI STL，如果没有指定底层实现的话，默认是以**deque**为缺省情况下栈的低层结构。

deque是一个双向队列，只要封住一段，只开通另一端就可以实现栈的逻辑了。

SGI STL中 队列底层实现缺省情况下一样使用deque实现的。

## 大顶堆、小顶堆

**堆是一棵完全二叉树，树中每个结点的值都不小于（或不大于）其左右孩子的值。** 如果父亲结点是大于等于左右孩子就是大顶堆，小于等于左右孩子就是小顶堆。

简单来说大顶堆（堆头是最大元素），小顶堆（堆头是最小元素）。

## STL-优先队列

```cpp
priority_queue< Node,vector< Node >,cmp > Q;
//定义了一个存放Node型元素，底层是用vector实现，优先级是通过cmp比较获得。
```

## 例题

[155. 最小栈](https://leetcode.cn/problems/min-stack)

> 双栈，minst保存了每个数之前的最小值。

[232. 用栈实现队列](https://leetcode.cn/problems/implement-queue-using-stacks/)

[225. 用队列实现栈](https://leetcode.cn/problems/implement-stack-using-queues/)

[20. 有效的括号](https://leetcode.cn/problems/valid-parentheses/)

[1047. 删除字符串中的所有相邻重复项](https://leetcode.cn/problems/remove-all-adjacent-duplicates-in-string/)

[150. 逆波兰表达式求值](https://leetcode.cn/problems/evaluate-reverse-polish-notation/)

[239. 滑动窗口最大值](https://leetcode.cn/problems/sliding-window-maximum/)

> 用双端队列模拟进出，维护一个单调队列，队首的元素一定是当前窗口中最大的值。

[347. 前 K 个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/)

> 模拟一个小根堆，重写cmp函数，输出前k个元素即可。
>
> 或者STL。

[215. 数组中的第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/description/)

> 返回第k大的元素。
>
> 维护一个大顶堆（父节点是最大值），栈中超过k个元素就弹出最小的值，最后返回栈顶即可。
>
> 做法2：快速选择。

[ 23. 合并K个排序链表](https://leetcode.cn/problems/merge-k-sorted-lists)

> 将非空的链表节点插入小顶堆中，然后不断弹出较小值，插入弹出节点的下一个节点值（非空的话）。
>
> 排序所有值，构建新的链表返回。
>
> 进阶：分治。

**[32. 最长有效括号](https://leetcode.cn/problems/longest-valid-parentheses)**

> 最长，这里指的是连续，难点在于如何更新答案。
>
> 不断存放最左侧满足的坐标。
>
> 1. 遇到左括号，放入坐标值。
>2. 遇到右括号时，如果当前栈为空，说明连续边界要更换`i + 1`
> 3. 不为空说明开始匹配子串了，弹出一个坐标，如果不为空说明答案为`i - st.top()`，为空说明是一个连续的结束，`i - start + 1`

**[394. 字符串解码](https://leetcode.cn/problems/decode-string)**

> 用双栈或者单个栈存放数字和字母。当字符为"["时，入栈数字和字符，当字符为"]"，出栈数字和字符。
>
> 用`stoi函数`完成str转换数字。

[ 148. 排序链表](https://leetcode.cn/problems/sort-list)

> 想到了优先队列，从小到大存入优先级队列，最后再弹出每个结点
>
> 卡了很久的点是结尾的点没有指向nullptr，折磨住了，当然了实际中我们应该使得每个操作合法化，这里可能是答案遍历时出了问题。
>
> 也可以直接取出结点，sort然后放入。
>
> 二刷应该考虑排序的方法，优化时间复杂度。

## 单调栈

### 何时使用

通常是一维数组，要寻找任一个元素的右边或者左边第一个比自己大或者小的元素的位置，此时我们就要想到可以用单调栈了。

本质是空间换时间，时间复杂度为O(n)。

### 如何使用

在使用单调栈的时候首先要明确如下几点：

1. 单调栈里存放的元素是什么？

单调栈里只需要存放元素的下标i就可以了，如果需要使用对应的元素，直接T[i]就可以获取。

2. 单调栈里元素是递增呢？ 还是递减呢？

**注意一下顺序为 从栈头到栈底的顺序**。

```cpp
stack<int> st;
//此处一般需要给数组最后添加结束标志符，具体下面例题会有详细讲解
for (遍历这个数组)
{
	if (栈空 || 栈顶元素大于等于当前比较元素)
	{
		入栈;
	}
	else
	{
		while (栈不为空 && 栈顶元素小于当前元素)
		{
			栈顶元素出栈;
			更新结果;
		}
		当前数据入栈;
	}
}

```

### 例题

**[739. 每日温度](https://leetcode.cn/problems/daily-temperatures/description/)**

> 维护一个单调递减的栈，当出现温度大于栈顶元素值时，记录答案。

**[496. 下一个更大元素 I](https://leetcode.cn/problems/next-greater-element-i/description/)**

> 基本可以同上处理。
>
> 不过加了一个映射。对nums2单调栈，result[i] 表示 i 这个数字在nums2中第一个比他大的数的下标。
>
> 再遍历nums1, result[nums1[i]] == -1说明没有比他大的数，否则就是找到了下标，再把下标对在nums2的值放入，否则就是放入-1。

**[503. 下一个更大元素 II](https://leetcode.cn/problems/next-greater-element-ii/description/)**

> 对比上一题，这题变成了循环数组，一种方法是拼接，这种达到延续前半部分的作用，再对后半部分答案取余。
>
> 实际上可以直接利用取余这个操作实现，double的作用。

**[42. 接雨水](https://leetcode.cn/problems/trapping-rain-water/description/)**

> 方法一：双指针法。
>
> 按照列方向统计每一列的储水量。
>
> 左右指针分别指向该列的左右边的最大值，其中的最小值 - 当前列的高度就得到了这一列的雨水，这是一个O(n^2)，超时。
>
> 方法二：DP
>
> 对上面的方法优化，待做。
>
> 方法三：单调栈
>
> 关键是底部，左侧、右侧高度。
>
> 这里在例题中，3高度时，会把前面的11都弹出，因为底和最高相等。

**[🆙84. 柱状图中最大的矩形](https://leetcode.cn/problems/largest-rectangle-in-histogram/description/)**

> 右边界计算的非常巧妙啊！比我大的都弹走了，你就是比我小的第一个元素，这就是高度。

