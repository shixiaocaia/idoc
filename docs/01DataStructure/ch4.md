字符串
===

## KMP

用一个前缀表`next`，当发现字符不匹配时，跳转至前面已经匹配的**最长前后缀**位置，而不用重新开始匹配，最坏情况是重头开始匹配字符串。

### 如何求next数组

```cpp
void getnext(vector<int>& next, string& needle){
    int j = -1;
    next[0] = j;
    for(int i = 1; i < needle.size(); i++){
        while(j >= 0 && needle[i] != needle[j + 1]){ //字符不匹配
            j = next[j];
        }

        if(needle[i] == needle[j + 1]){ //字符匹配时
            j++;
        }
        next[i] = j;
    }
}
```

> 从-1下标开始只是标记的手段。

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

> 整体思路：删除空格，反转字符串，反转单词还原
>
> 删除空格，用双指针删除中间空间，在特判开头和末尾。
>
> 还原单词时，用一个start表示单词开始，再循环找到每个单词的结尾（空格，或者最后一个单词是末尾）

[459. 重复的子字符串](https://leetcode.cn/problems/repeated-substring-pattern/)

> 暴力遍历：
>
> 1. 截取字串，由于必须有2个以上的子串构成，因此字串长度一定小于等于size/2。
>
> 2. 判断子串是否和前部分字串相等，满足一种情况时即可，遍历完所有情况找不到时，即错误。

[28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)

> 用KMP匹配。
>
> 当模式串到末尾时，返回`i - size + 1`即为起始坐标。
