字符串
===

## KMP

用一个前缀表`next`，当发现字符不匹配时，跳转至前面已经匹配的**最长前后缀**位置，而不用重新开始匹配，最坏情况是重头开始匹配字符串。

其中n为文本串长度，m为模式串长度，因为在匹配的过程中，根据前缀表不断调整匹配的位置，可以看出匹配的过程是O(n)，之前还要单独生成next数组，时间复杂度是O(m)。所以整个KMP算法的时间复杂度是O(n+m)的。

### 如何求next数组

```cpp
void getnext(vector<int>& next, string& needle){
    int j = -1;
    next[0] = j;
    for(int i = 1; i < needle.size(); i++){
        while(j >= 0 && needle[i] != needle[j + 1]){ //字符不匹配
            j = next[j];//向前回退，回退到开头j = -1了不能重新开始，j就是前一个，比较的是j + 1
        }

        if(needle[i] == needle[j + 1]){ //字符匹配时
            j++;
        }
        next[i] = j;
    }
}
```

> 从-1下标开始只是标记的手段，我理解也是告诉我们0位置不可继续回退匹配。

## 例题

[344. 反转字符串](https://leetcode.cn/problems/reverse-string/)

[541. 反转字符串 II](https://leetcode.cn/problems/reverse-string-ii/)

> 用一个变量维护一个区间，当这个区间内字符大于等于k的字符时，将前k个字符翻转。
>
> 如果小于的话，则将当前剩余的字符全部反转。
>
> 所以处理是判断[i, i + k]是否在区间内，区间移动是加2k长度。

[剑指 Offer 05. 替换空格](https://leetcode.cn/problems/ti-huan-kong-ge-lcof/)

[151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)

**[459. 重复的子字符串](https://leetcode.cn/problems/repeated-substring-pattern/)**

> 暴力遍历：
>
> 1. 截取字串，由于必须有2个以上的子串构成，因此字串长度一定小于等于size/2。
>
> 2. 判断子串是否和前部分字串相等，满足一种情况时即可，遍历完所有情况找不到时，即错误。
>
> abcabc--->abcabc abcabc
>
> - 只要两个s拼接在一起，里面还出现一个s的话，就说明是由重复子串组成。
> - 在判断 s + s 拼接的字符串里是否出现一个s的的时候，要刨除 s + s 的首字符和尾字符，这样避免在s+s中搜索出原来的s
> - 我们要搜索的是中间拼接出来的s。

[28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)

> 用KMP匹配。
>
> 当模式串到末尾时，返回`i - size + 1`即为起始坐标。
