链表
===

## 基本用法

**链表的定义**

```cpp
struct ListNode{
    int val; //element
    ListNode *next; //next ptr
    ListNode(int x) : val(x), next(NULL) {} // 节点的构造函数
}

ListNod* head = new ListNode(5);
```

```go
type ListNode struct{
    Val int
    Next *ListNode
}
```

**删除节点**：`cur = cur.Next`

## 例题

[21. 合并两个有序链表](https://leetcode.cn/problems/merge-two-sorted-lists/)

模板题。

[LC203.移除链表元素](https://leetcode.cn/problems/remove-linked-list-elements/)

> 使用C++，注意释放删除的内存空间。
>
> 通过增加一个哑节点，这样如果删除头结点的话，不会影响，因为最终返回的是哑节点的下一个节点。
>
> 如果没有哑节点，无法进行这样的直接替换操作。而是需要单独移动头结点的位置，最好再释放。
>
> 必须用一个中间变量来保存要删除的节点，否则`cur->next`指向的就不是要删除的点了。

[LC707.设计链表](https://leetcode.cn/problems/design-linked-list/)

> 思路简单，但是全是细节的题。
>
> 模拟了链表的各种操作。

[LC206.反转链表](https://leetcode.cn/problems/reverse-linked-list/)

> 用中间指针，交替变化的过程。
>
> 指针，前后的关系，中间变量

**[🆙LC24. 两两交换链表中的节点](https://leetcode.cn/problems/swap-nodes-in-pairs/)**

> 通过循环判断后两个节点是否为空
>
> 1. 保存后两个节点
>2. cur 指向 2 这个节点
> 3. 再指向1这个节点
> 4. 最后指向下一组的3

[LC19.删除链表的倒数第N个节点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/)

> 处理数组、链表中的某部分——双指针
>
> 将fast指针指向删除节点的前一个节点，然后fast指针遍历到NULL时，刚好slow指针遍历到要删除的节点。
>
> 同样用哑节点，规避了分类头节点问题。
>

[面试题 02.07. 链表相交](https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/)

> 先计算两个链表的长度，计算他们长度差，将指针移动到统一起点。
>
> 开始遍历较长的链表（默认A，比较后交换），当二者指针相同相等时，找到了相交节点返回，否则返回NULL。
>
> 注意判断交点是**指针相等**，不是数值相等。
>
> 同样可以窗帘两个链表，直到相交点，否则返回时NULL。
>
> ---
>
> 数学知识：
>
> pA走过的路径为A链+B链
>
> pB走过的路径为B链+A链
>
> pA和pB走过的长度都相同，都是A链和B链的长度之和，相当于将两条链从尾端对齐，如果相交，则会提前在相交点相遇，如果没有相交点，则会在最后相遇。

**[🆙LC142.环形链表II](https://leetcode.cn/problems/linked-list-cycle-ii/)**

> 主要是涉及到的数学问题。
>
> 1. 判断是否有环形：快慢指针，如果最终相遇就是有环形。
> 2. 判断环形的入口：数学公式推导。

[剑指 Offer 35. 复杂链表的复制](https://leetcode.cn/problems/fu-za-lian-biao-de-fu-zhi-lcof/description/)

> 一开始没用读懂题意，不能直接遍历复制吗？
>
> 因为随机指针的存在，当我们拷贝节点时，「当前节点的随机指针指向的节点」可能还没创建。
>
> **random随机指向的节点位置，可能在新链表中还没有复制过来**
>
> 需要我们利用回溯的方式，让每个节点的拷贝操作相互独立。对于当前节点，我们首先要进行拷贝，然后我们进行「当前节点的后继节点」和「当前节点的随机指针指向的节点」拷贝，拷贝完成后将创建的新节点的指针返回，即可完成当前节点的两指针的赋值。

[86. 分隔链表](https://leetcode.cn/problems/partition-list/description/)

> 建立两个单链表，分别存放大于等于和小于的节点值，然后合并两个节点。

[876. 链表的中间结点](https://leetcode.cn/problems/middle-of-the-linked-list/description/)

> 如果链表长度为n，那么中间点为n/2位置，可以联想到LC 19题，实现单次遍历，不用先计算长度再取中间值的情况。

## 总结
