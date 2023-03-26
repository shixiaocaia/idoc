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

当我们要使用集合来解决哈希问题的时候，优先使用unordered_set，因为它的查询和增删效率是最优的；

如果需要集合是有序的，那么就用set；

如果要求不仅有序还要有重复数据的话，那么就用multiset；

对比之下，map在需要多个数值时可以考虑，分别引用key，value，例如LC.1。

## 例题

[LC383.赎金信](https://leetcode.cn/problems/ransom-note/)

> 模板题，将字母转为数组下标(ASCII值)，或者用map都可以。

[LC242.有效的字母异位词](https://leetcode.cn/problems/valid-anagram/)

> 用数组存储string a中字母出现的次数，遍历string b在a中出现的次数，每出现一次对应-1，最好判断26个字母是否有非0的字母。
>
> 关键码：由于字母的特殊性，且全为小写字母，可以使用s[i] - 'a'，作为索引。

[LC349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)

> 限制数据范围：数组B中的值在A中寻找是否出现，第一次出现的话加入ans中。O(n^2)。
>
> 不限数据范围：使用std::unordered_set，读写效率高，不需要排序，还能去重。

[LC350. 两个数组的交集II](https://leetcode.cn/problems/intersection-of-two-arrays-ii/)

> 同样可以用数组解决。

[LC202.快乐数](https://leetcode.cn/problems/happy-number/)

> 关键词“重复”，联想到哈希表。
>
> 思路：如果这个数重复出现过，说明非快乐数，否则遍历到判断为止。
>
> 用`unorder_set<int>`去重。

[LC1.两数之和](https://leetcode.cn/problems/two-sum/)

> - 为什么会想到用哈希表
>
> target = num 1+ num2, 很容易想到遍历一个数，看num2 是否在map当中，并且
>
> - 哈希表为什么用map
>
>  要判断一个数出现，同时还要返回这个数的下标，因此需要两个值，使用map的value key可以分别保存。
>
> - 本题map是用来存什么的
>
>  存储数值中的另一半。最终一定能遍历num时，target - num 在map当中
>
> - map中的key和value用来存什么的
>
>  key 存储 数值，value存储下标。因为题意保证有唯一解，当遍历此时值的另一半不在map中时，添加此时的数值为key，下标为value到map中，直到遍历到另一半已经在map中结束。

𖤐[LC15.三树之和](https://leetcode.cn/problems/3sum/)

> 一开始想用哈希表，计算前两个数和，然后判断第三个数是否在map中，出现了error错误Expected member name or ';' after declaration specifiers，放弃了。

> Expected member name or ';' after declaration specifiers
>
> 这个错误不一定是所指行，可能是前面的符号滥用。

> 题解版：用双指针维护 + 去重
>
> a, b, c 三个数的去重，是难点。

𖤐[LC18. 四数之和](https://leetcode.cn/problems/4sum/)

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

[LC1. 两数之和](https://leetcode.cn/problems/two-sum/description/)

> 在一个表中查相应数据，联想到了哈希表。
>
> 找到返回，否则插入数值。

[ 128. 最长连续序列](https://leetcode.cn/problems/longest-consecutive-sequence)

> 查找连续的序列，就是判断 X，X+1，X+2是否存在，时间复杂度O(n)，想到哈希表，顺表还能去重。
>
> 遍历哈希表中数，且判断每一个数X是新开始（X-1不存在）。

[剑指 Offer 50. 第一个只出现一次的字符](https://leetcode.cn/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/description/?envType=study-plan&id=lcof&plan=lcof&plan_progress=fi7d972)

> 哈希表，每次遍历一个字符判断是否在哈希表当中。
>
> 第二次遍历，第一个true的，是第一个单个字符的答案。

[剑指 Offer 39. 数组中出现次数超过一半的](https://leetcode.cn/problems/shu-zu-zhong-chu-xian-ci-shu-chao-guo-yi-ban-de-shu-zi-lcof/?envType=study-plan&id=lcof&plan=lcof&plan_progress=fi7d972)

## 对比

- 数组作为哈希表，比如[LC383.赎金信](https://leetcode.cn/problems/ransom-note/)，我们知道明确的数组大小，可以将字母值转化为键值，对比用map，节省了开销。

- set作为哈希表，比如[LC349. 两个数组的交集](https://leetcode.cn/problems/intersection-of-two-arrays/)， 我们不清楚数组的大小情况，或者值的间隔特别大，会造成空间的浪费。此外数组可以set相比数组还可以去重。

- map作为哈希表，[LC1.两数之和](https://leetcode.cn/problems/two-sum/)，不仅需要判断key，还要记录位置，将位置作为value记录。
