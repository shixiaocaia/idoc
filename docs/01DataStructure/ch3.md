哈希表
===

**定义**

简单来说，数组就可以看成一个哈希表，哈希表中的**关键码**是在数组中索引下标，通过下标访问对应的元素。

**作用**

快速判断一个元素是否在集合内。

~~想到了用map<string, int>来映射，或者是bool flag[object]一些用法~~（原来这样的操作就是哈希结构了）。并且考虑到如果用枚举判断的话，需要O(n),而哈希表只需要O(1)。

**哈希函数**

通过一个函数将对象映射为特定的编码方式，例如将字符串形式转化为不同数值，对应为哈希表中的索引下标。

如果哈希函数得到的数值大于了tableSize，通过取模操作，保证在范围以内。

**哈希碰撞**

但是如果初始对象数量就大于哈希表大小，就会发生冲突。不同对象映射到同一个索引位置，称为哈希碰撞。可以通过拉链法、线性探测法解决。

拉链法：链式存储，在同一个索引位置，进行像链表形式一样链接在一起。

线性探测法：一定要保证tableSize（哈希表大小）大于dataSize（数据规模）。 我们需要依靠哈希表中的空位来解决碰撞问题。当发生哈希碰撞时，寻找一个空缺的位置存放冲突元素。

## 哈希表用法

**哈希结构**

常用的结构包括：

- 数组
- set（集合）
- map（映射）

| 集合               | 底层实现 | 是否有序 | 数值是否可以重复 | 能否更改数值 | 查询效率 | 增删效率 |
| ------------------ | -------- | -------- | ---------------- | ------------ | -------- | -------- |
| std::set           | 红黑树   | 有序     | 否               | 否           | O(log n) | O(log n) |
| std::multiset      | 红黑树   | 有序     | 是               | 否           | O(logn)  | O(logn)  |
| std::unordered_set | 哈希表   | 无序     | 否               | 否           | O(1)     | O(1)     |

| 映射               | 底层实现 | 是否有序 | 数值是否可以重复 | 能否更改数值 | 查询效率 | 增删效率 |
| ------------------ | -------- | -------- | ---------------- | ------------ | -------- | -------- |
| std::map           | 红黑树   | key有序  | key不可重复      | key不可修改  | O(logn)  | O(logn)  |
| std::multimap      | 红黑树   | key有序  | key可重复        | key不可修改  | O(log n) | O(log n) |
| std::unordered_map | 哈希表   | key无序  | key不可重复      | key不可修改  | O(1)     | O(1)     |

当我们要使用集合来解决哈希问题的时候，优先使用unordered_set，因为它的查询和增删效率是最优的；

如果需要集合是有序的，那么就用set；

如果要求不仅有序还要有重复数据的话，那么就用multiset；

对比之下，map在需要多个数值时可以考虑，分别引用key，value，例如LC.1。

## 例题

[LC383.赎金信](https://leetcode.cn/problems/ransom-note/)

[LC242.有效的字母异位词](https://leetcode.cn/problems/valid-anagram/)

[LC349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)

[LC202.快乐数](https://leetcode.cn/problems/happy-number/)

> 关键词“重复”，联想到哈希表。
>
> 思路：如果这个数重复出现过，说明非快乐数，否则遍历到判断为止。
>
> 用`unorder_set<int>`去重。

[LC1.两数之和](https://leetcode.cn/problems/two-sum/)

**[LC15.三树之和](https://leetcode.cn/problems/3sum/)**

> 题解版：用双指针维护 + 去重
>
> a, b, c 三个数的去重，是难点。

**[LC18. 四数之和](https://leetcode.cn/problems/4sum/)**

> 对比三数之和，增加了一层外循环。
>
> - 总体思路：用两层for维护最小的两个数，然后双指针维护后面的部分。
> - 第一层for ：当前数大于目标值时，并且当前数大于等于0，break。外加 if(i > 0 && nums[i] == nums[i-1]) continue;进行剪枝。在这个数和前一个数大于0的情况下，后续有满足的组合，在前一种必然出现过。
> - 第二层for : 即再上一层基础上初始值时nums[i] + nums[j]进行比较。
> - 双指针同上一题一样进行维护。
>
> 注意数据的溢出。
>
> LC15 和18 的剪枝是难点。

[LC49. 字母异位词分组](https://leetcode.cn/problems/group-anagrams/)

> 结合例题的[LC242.有效的字母异位词](https://leetcode.cn/problems/valid-anagram/)。将一个单词的所有字母进行重新排列得到新的单词，那我们可以将每个单词按照一定顺序排列后的值，作为关键码，相同的放到一起，就想到了用哈希表实现。
>
> 区别之前的，这里的value值是vector存放多个string。

**[ 128. 最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence)**

> 查找连续的序列，就是判断 X，X+1，X+2是否存在，时间复杂度O(n)，想到哈希表，顺便还能去重。
>
> 遍历哈希表中数，且判断每一个数X是新开始（X-1不存在，否则长度不如前者）。

[剑指 Offer 50. 第一个只出现一次的字符](https://leetcode.cn/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/description/?envType=study-plan&id=lcof&plan=lcof&plan_progress=fi7d972)

> 哈希表，每次遍历一个字符判断是否在哈希表当中。
>
> 第二次遍历，第一个true的，是第一个单个字符的答案。

[剑指 Offer 39. 数组中出现次数超过一半的](https://leetcode.cn/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/?envType=study-plan&id=lcof&plan=lcof&plan_progress=fi7d972)

