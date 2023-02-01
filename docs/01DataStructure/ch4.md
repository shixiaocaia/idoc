字符串
===

在过去参加竞赛的经历当中，字符串类的题一般是暴力+选择合适的STL的题。在这次学习过程中，应该尽量少用直接的STL的函数，更能明白其中的原理。如果库函数仅仅是 解题过程中的一小部分，并且你已经很清楚这个库函数的内部实现原理的话，可以考虑使用库函数。

**string和vector\<char\>之间的区别**

1. 在C语言通过'\0'来判断是否结束，在C++当中通过size接口判断字符串接口。
2. string和vector\<char\>之间区别不大，但是string提供了更多的接口，并且重载了一定的运算符，因此处理字符串一般用string较好。

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

> 1. string 中本来就有reverse实现倒叙。
>
> 2. 进行字符串数组的模拟，swap交换首尾的数据
>
> 3. 补充：最基本的值交换是：中间值。这里补充一个用异或运算符实现。
>
>    首先有个原理需要知道：
>
>    若a\^b=c,则c\^b=a,c\^a=b
>
>    可通过穷举法进行证明
>    
>    ![img](http://pic.shixiaocaia.fun/202209042108856.gif)
>
>    那么就可以通过以下方式进行两个变量的交换
>
>    a=a^b;
>
>    b=a^b;
>
>    a=a^b;

[541. 反转字符串 II](https://leetcode.cn/problems/reverse-string-ii/)

> 用一个变量维护一个区间，当这个区间内字符大于等于k的字符时，将前k个字符翻转。
>
> 如果小于的话，则将当前剩余的字符全部反转。
>
> 所以处理是判断[i, i + k]是否在区间内，区间移动是加2k长度。

[剑指 Offer 05. 替换空格](https://leetcode.cn/problems/ti-huan-kong-ge-lcof/)

> 在中间插入一段字符串，就想到什么时候插入，就联想到了用双指针的思路，一个指针维护原来字符串判断什么时候插入，一个指针记录新字符串的位置。

[151. 反转字符串中的单词](https://leetcode.cn/problems/reverse-words-in-a-string/)
> 整体思路：删除空格，反转字符串，反转单词还原
>
> 删除空格，用双指针删除中间空间，在特判开头和末尾。
>
> 还原单词时，用一个start表示单词开始，再循环找到每个单词的结尾（空格，或者最后一个单词是末尾）

[459. 重复的子字符串](https://leetcode.cn/problems/repeated-substring-pattern/)

> 暴力遍历：截取字串，由于必须有2个以上的子串构成，因此字串长度一定小于等于size/2。判断子串是否和前部分字串相等，满足一种情况时即可，遍历完所有情况找不到时，即错误。

[28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)

> 用KMP匹配。
>
> 当模式串到末尾时，返回`i - size + 1`即为起始坐标。
