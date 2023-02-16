数组
===

## 二分查找

**二分搜索，可以归为两端向中心的双指针。**

### 思路

**使用前提**

- 有序数组
- 无重复的元素

**思路**

[left,right]闭区间版本

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size()-1;
// 右区间为闭区间，下标从size-1开始
        
        while(left <= right){
            int mid = left + (right - left) / 2;// 防止溢出 等同于(left + right)/2
            if(nums[mid] > target)
                right = mid - 1;
            else if(nums[mid] < target)
                left = mid + 1;
            else return mid;
        }
        return -1;
    }
};
```

- 这里防止溢出是指，当left和right同为int较大型数据时候，(left+right)容易溢出，而left + (right - left) / 2，相等价也避免了溢出的问题。

[left,right)左闭右开版本

```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int left = 0;
        int right = nums.size();

        while(left < right){
            int mid = left + ((right - left) >> 1);
            if(nums[mid] > target)
                right = mid ; //右是开区间
            else if(nums[mid] < target)
                left = mid + 1;
            else return mid;
        }
        return -1;
    }
};
```

- 位运算符优先级大于+-，注意括号
- 位运算符作除法速度大于除法

### 例题

 **模板题**

> [LC704.二分查找](https://leetcode.cn/problems/binary-search/)
> **[LC69.x的平方](https://leetcode.cn/problems/sqrtx/)**
>
> > 注意两数平方时越界，要加(long long)
>
>  **[LC367.有效的完全平方数](https://leetcode.cn/problems/valid-perfect-square/)**

 **[LC35.搜索插入位置](https://leetcode.cn/problems/search-insert-position/)**

> 二分：一共分为三（四）种情况：（按照[left,right]考虑）
>
> 1. 数组中找到，返回序号
> 2. 数组中插入，最终left==right时，若nums[right]<target, 那么left=left+1（也等价于right+1,因为二者重合了，数值相同），若nums[left] > target, 那么right=right -1但是实际插入位置应该就在此处，因此为right+1，两种比值可以更新为一种right+1。
> 3. 越界插入，如果小于所有数，在头部插入，最后更新为[0,-1], 实际插入为left或者right+1。如果大于所有数，在尾部插入，最后更新为[nums.size()+1,num.size()],实际插入为left或者right+1。
>
> 总结：最后如果没有找到这个数，最终都可以归纳为right+1情况。

> 暴力循环，如果发现比target大的数，返回当前位置插入。如果遍历完没有，即在nums.size()处插入。

**[LC34.在排序数组中查找元素的第一个和最后一个位置](https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/)**

> 寻找左右边界，对于我们新手分开做，先找左边界，再找右边界。区别“数据不重复”的题，这里可能会遇到重复数据。
>
> 1. 找左边界，从右边向左边推，当我们找到一个target值时，应该继续向左边移动，看看有没有重复值出现，同时这里做一个剪枝判断，如果前一个值小于target或者当前数为第一个数时，跳出循环。
> 2. 找右边界，从左边向右边推，当我们找到一个target时，应该继续向右边，找到边界点，同时做一个剪枝判断，如果后一个值大于target值或者当前为最后一个数时，跳出循环。
>
> 本题卡了我很久一个点：**数组越界访问问题**，剪枝判断应该先判断越界问题再判断大小，否则会出现数组的越界访问。
>
> 🆙**二刷：**
>
> 这边和后面处理贪心问题一样，先搞好一头再去排另一头，这里我们分开找两侧的边界。
>
> 过去二分相等时返回值，这里二分继续向左或者向右找到相等的值。

 **[167. 两数之和 II - 输入有序数组](https://leetcode.cn/problems/two-sum-ii-input-array-is-sorted/description/)**

> 自己写的是二分方法。
>
> 可以用双指针，不断收缩左右区间，找到最终的答案。
>
> （二分就是左右双指针，相向而行）

[33. 搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/description/)

>看到题解想到二分，去写了，忽略一个问题，这是旋转后的数组，**非有序的**。
>
>相对暴力点想法是：通过二分查找原数组的数组下标，将左边界更新为这个下标，然后右边界更新为`nums.size() - 1 + 原来nums[0]起始位置`。再做一次二分，数组下标溢出做取余处理就能得到当前的位置，解决了之前数组非有序无法直接用二分的问题。

## 双指针

> [!NOTE]
>
> 双指针主要分为两类：左右指针和快慢指针。
>
> 左右指针：两个指针相向而行或者向背而行
>
> 快慢指针：两个指针同向而行，一快一慢。
>
> 双指针的经典应用，如果要删除倒数第n个节点，让fast移动n步，然后让fast和slow同时移动，直到fast指向链表末尾。删掉slow所指向的节点就可以了。

**快慢指针**

```cpp
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        int slow = 0, fast = 0;
        //指向不是删除元素时更新
        //快指针是在原数组中寻找val，慢指针是最后的答案数组位置，用来更新
        for(; fast < nums.size(); fast++){
            if(nums[fast] != val){ 
                nums[slow++] = nums[fast];
            }
        }
        return slow;
    }
};
```

**优化**

```cpp
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
       int leftIndex = 0;
       int rightIndex = nums.size() - 1;
       while(leftIndex <= rightIndex){
           //找到左边等于val
           while(leftIndex <= rightIndex && nums[leftIndex] != val){
               leftIndex++;
           }
           //找到右边不等于val，如果等于，也会跳过这一个
           while(leftIndex <= rightIndex && nums[rightIndex] ==val){
               rightIndex--;
           }
           if(leftIndex < rightIndex)
           {
               nums[leftIndex++] = nums[rightIndex--];
           }
       }
       //最后leftIndex 肯定指向下一个，返回
       return leftIndex;
    }
};
```

**模板题**

[LC24.删除重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/)

[LC26. 删除有序数组中的重复项](https://leetcode.cn/submissions/detail/387295751/)

[LC83. 删除排序链表中的重复元素](https://leetcode.cn/problems/remove-duplicates-from-sorted-list/description/)

[LC27.移除元素](https://leetcode.cn/problems/remove-element/)

[LC283.移动零](https://leetcode.cn/problems/move-zeroes/)

> 一个指向0，一个指向非0，可以用来交换

[LC844.比较含退格的字符串](https://leetcode.cn/problems/backspace-string-compare/)

> 第一种用栈暴力做
> 第二种是，明白#字符只针对前一个字符进行退格基础上，那我们便可以后续遍历这两个数组，确定一个不会移动的字符时，进行比较。
>
> 当序列都在边界范围时进行比较，else的时候分为三种情况，最后合并为一种，这里比较复杂一点。
>
> 🆙二刷：思考的顺序，从前还是从后处理的顺序。

[LC977.有序数组的平方](https://leetcode.cn/problems/squares-of-a-sorted-array/)

> 用了暴力。
>
> 排序待更新。
>
> 使用双向指针，由于原数组按照非递减排序，那么平方后的数，应该在两头，通过双向指针指向头和尾，进行比较大小移动。
>
> 每次比较左边和右边哪个数更大，更新左右边界，用一个k记录ans数组的位置。

[56. 合并区间](https://leetcode.cn/problems/merge-intervals)

> 以左边界排序，排序后的数组左边界肯定在右侧。
>
> 维护一个区间l，r，当下一个区间的左边界超过当前区间的右侧，那么就要存入档案，以及更新区间。否则的话只需要更新右区间。
>
> 最后不能忘记最后一组区间需要手动存入。



**其他章节双指针思路题**

> [LC19.删除链表的倒数第N个节点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)
>
> [LC15.三树之和](https://leetcode.cn/problems/3sum/)

## 滑动窗口

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, right;
        int sum = 0;
        int minlen = INT_MAX;

        for (right = 0; right < nums.size(); right++) {
            sum += nums[right]; //字串和
            while (left <= right && sum >= target) { //更新答案和起始位置
                minlen = min(minlen, right - left + 1);
                sum -= nums[left++];
            }
        }

        return minlen == INT_MAX ? 0 : minlen; //判断有没有找到合适的子串
    }
};

```

```cpp
最小滑窗模板：给定数组 nums，定义滑窗的左右边界 i, j，求满足某个条件的滑窗的最小长度。
while j < len(nums):
    判断[i, j]是否满足条件
    while 满足条件：
        不断更新结果(注意在while内更新！)
        i += 1 （最大程度的压缩i，使得滑窗尽可能的小）
    j += 1
        
最大滑窗模板：给定数组 nums，定义滑窗的左右边界 i, j，求满足某个条件的滑窗的最大长度。
while j < len(nums):
    判断[i, j]是否满足条件
    while 不满足条件：
        i += 1 （最保守的压缩i，一旦满足条件了就退出压缩i的过程，使得滑窗尽可能的大）
    不断更新结果（注意在while外更新！）
    j += 1
```

**模板题**

> [LC209.最小子串长度](https://leetcode.cn/problems/minimum-size-subarray-sum/)
>
> > 本题可以用前缀和+二分做，通过s[j]-s[i] >= target,可以变化为 s[j] >= s[i]+target。在s数组中寻找第一个大于 s[i]+target位置，进行更新大小，使用了C++ lower_bound()函数
>
> [LC904.水果篮子](https://leetcode.cn/problems/fruit-into-baskets/)
>
> > 大佬的滑动窗口思路，我不断地把水果放到篮子中，当水果种类大于2种时，进行更新篮子中水果种类，最后更新result。
> >
> > 这里的更新篮子思路是：从左边界left开始更新，将这个序号下的水果数-1，当移动到删除完这个水果数为0时，此时水果种类-1，加上前面右边界更新的一个新的，刚好为2种，继续更新答案。
> >
> > 🆙二刷没做出来，没想到用map来映射这是第几种水果，如果遇到0的说明是新的一种，如果水果种树大于2时，更新左边界，而答案是时时更新的。
>
> [LC76.最小覆盖字串](https://leetcode.cn/problems/minimum-window-substring/)
>
> > 自己做的时候，忽略了字符串重复出现问题。以及在移动左边界上欠缺考虑，看题解使用的方法是在左边的字符数量已经在后面出现次数大于了所需数量，再去更新右边界。
>
> 🆙难点：字串问题划分为最大和最小，边界更新时机很重要。
>
> 1. 维护两个哈希表，一个hs，一个ht。
> 2. 定义两个指针，左指针j，右指针i，维护一个窗口[i,  j]。
> 3. 每向右一步，把s[i] 加入hs当中，hs[s[i]] ++。
> 4. 对于新加入的s[i], 如果`hs[s[i]] <= ht[s[i]]`，说明是必要的，且没超过需求的字符数量，用一个cnt记录一共需要多少个。
> 5. 当hs[s[j]] > ht[s[j]时，说明hs哈希表中s[j]的数量多于ht哈希表中s[j]的数量，此时我们就需要向右收缩滑动窗口，j++并使hs[s[j]]--，即hs[s[j ++ ]] --。每次更新保证这个字符数量是复合要求的，所以不更新cnt的大小。
> 6. 当`cnt == t.size`时，说明此时滑动窗口包含符串 `t` 的全部字符。我们重复上述过程找到最小窗口即为答案。
> 7. 更新答案时候保证这是复合字符串t长度的。
>
> 三刷：[题解](https://leetcode.cn/problems/minimum-window-substring/solutions/872360/leetcode-76-zui-xiao-fu-gai-zi-chuan-cja-lmqz/)

[LC438.找到字符串中所有字母异位词](https://leetcode.cn/problems/find-all-anagrams-in-a-string)

> 注意如果p长度大于s，那么一定没有结果，直接返回。
>
> 然后记录p数组的字母构成数量。维护一个滑动窗口。当前的字母数量小于0维护左边界。最好当前窗口长度等于p长度时，记录左边界。

[LC3.无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)

> 滑动窗口，当出现重现字符时，更新左边界，如果没有重复出现就更新答案。

## 前缀和

前缀和主要适用的场景是原始数组不会被修改的情况下，频繁查询某个区间的累加和。

```cpp
int subarraySum(int[] nums, int k) {
    int n = nums.length;
    // 构造前缀和
    int[] sum = new int[n + 1];
    sum[0] = 0; 
    for (int i = 0; i < n; i++)
        sum[i + 1] = sum[i] + nums[i];
    
    int ans = 0;
    // 穷举所有子数组
    for (int i = 1; i <= n; i++)
        for (int j = 0; j < i; j++)
            // sum of nums[j..i-1]
            if (sum[i] - sum[j] == k)
                ans++;
 
    return ans;
}
```

[560. 和为K的子数组](https://leetcode.cn/problems/subarray-sum-equals-k)

直接的前缀和TL，O(n^2)。

![无标题-2023-02-13-1914](http://pic.shixiaocaia.fun/202302131920381.png)



## 差分

差分数组的主要适用场景是频繁对原始数组的某个区间的元素进行增减。

```cpp
class Difference {
    // 差分数组
    private int[] diff;

    public Difference(int[] nums) {
        assert nums.length > 0;
        diff = new int[nums.length];
        // 构造差分数组
        diff[0] = nums[0];
        for (int i = 1; i < nums.length; i++) {
            diff[i] = nums[i] - nums[i - 1];
        }
    }

    /* 给闭区间 [i,j] 增加 val（可以是负数）*/
    public void increment(int i, int j, int val) {
        diff[i] += val;
        if (j + 1 < diff.length) {
            diff[j + 1] -= val;
        }
    }

    public int[] result() {
        int[] res = new int[diff.length];
        // 根据差分数组构造结果数组
        res[0] = diff[0];
        for (int i = 1; i < diff.length; i++) {
            res[i] = res[i - 1] + diff[i];
        }
        return res;
    }
}

```

```cpp
diff[i] = num[i] - num[i - 1];

diff[i] += k;
diff[j] -= k;

num[i] = num[i - 1] + diff[i];
num[i + 1] = num[i] + diff[i + 1]; //diff[i] + k,导致num[i] + k,后面都加了k

//对diff[j + 1] - k,后面的num[j + 1] - k和前面的+ k抵消。
```

[1109. 航班预订统计](https://leetcode.cn/problems/corporate-flight-bookings)

## 模拟

> [LC59.螺旋矩阵2](https://leetcode.cn/problems/spiral-matrix-ii/)
>
> [LC54.螺旋矩阵1](https://leetcode.cn/problems/spiral-matrix/)
>
> 上述两题的边界条件判断
