二叉树
===

**完全二叉树**

在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1~ 2^(h-1)  个节点。

**二叉搜索树**

二叉搜索树是一个有序树。

- 若它的左子树不空，则左子树上所有结点的值均小于它的根结点的值；
- 若它的右子树不空，则右子树上所有结点的值均大于它的根结点的值；
- 它的左、右子树也分别为二叉排序树。

> 这带来了一个重要性质，BST的中序遍历是有序的。

**平衡二叉搜索树**

平衡二叉搜索树：又被称为AVL（Adelson-Velsky and Landis）树，且具有以下性质：它是一棵空树或它的左右两个子树的高度差的绝对值不超过1，并且左右两个子树都是一棵平衡二叉树。

## 刷题思路

> 二叉树解题的思维模式分两类：
>
> **1、是否可以通过遍历一遍二叉树得到答案**？如果可以，用一个 `traverse` 函数配合外部变量来实现，这叫「遍历」的思维模式。
>
> **2、是否可以定义一个递归函数，通过子问题（子树）的答案推导出原问题的答案**？如果可以，写出这个递归函数的定义，并充分利用这个函数的返回值，这叫「分解问题」的思维模式。
>
> 无论使用哪种思维模式，你都需要思考：
>
> **如果单独抽出一个二叉树节点，它需要做什么事情？需要在什么时候（前/中/后序位置）做**？其他的节点不用你操心，递归函数会帮你在所有节点上执行相同的操作。

> 1. 递归的参数，返回值
> 2. 终止条件
> 3. 单层的递归操作

## 前、中、后、层序遍历

**[144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)**

**函数递归**

```cpp
class Solution {
public:
    vector<int> ans;
    void traversal(TreeNode* node){
        ans.push_back(node->val);
        if(node->left) traversal(node->left);
        if(node->right) traversal(node->right);
    }
    vector<int> preorderTraversal(TreeNode* root) {
        if(root) traversal(root);
        return ans;
    }
};
```

**统一迭代法**

```cpp
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> ans;
        stack<TreeNode*> st;
        if(root) st.push(root);
        while(!st.empty()){
            TreeNode* node = st.top();
            st.pop();
            if(node){
                if(node->right) st.push(node->right);
                if(node->left) st.push(node->left);
                st.push(node);
                st.push(NULL);
            }
            else{
                node = st.top();
                st.pop();
                ans.push_back(node->val);
            }
        }
        return ans;
    }
};
```

> 前序遍历出的序列的第一个数是根节点。

**[94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)**

**函数递归**

```cpp
class Solution {
public:
    void traversal(TreeNode* node, vector<int>& ans){
        if(node->left) traversal(node->left, ans);
        ans.push_back(node->val);
        if(node->right) traversal(node->right, ans);
        return;
    }
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> ans;
        if(root) traversal(root, ans);
        return ans;
    }
};
```

**统一迭代法**

```cpp
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        stack<TreeNode*> st;
        vector<int> ans;
        if(root) st.push(root);
        while(!st.empty()){
            TreeNode* node = st.top();
            st.pop();
            if(node){
                if(node->right) st.push(node->right);
                st.push(node);
                st.push(NULL);
                if(node->left)  st.push(node->left);;
            }
            else{
                node = st.top();
                st.pop();
                ans.push_back(node->val);
            }
        }
        return ans;
    }
};
```

**[145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)**

**函数递归**

```cpp
class Solution {
public:
    void traversal(TreeNode* node, vector<int>& ans){
        if(node->left) traversal(node->left, ans);
        if(node->right) traversal(node->right, ans);
        ans.push_back(node->val);
        return;
    }
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int>ans;
        if(root) traversal(root, ans);
        return ans;
    }
};
```

**统一迭代法**

```cpp
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        stack<TreeNode*> st;
        vector<int> ans;
        if(root) st.push(root);
        while(!st.empty()){
            TreeNode* node = st.top();
            st.pop();
            if(node){
                st.push(node);
                st.push(NULL);
                if(node->right) st.push(node->right);
                if(node->left)  st.push(node->left);;
            }
            else{
                node = st.top();
                st.pop();
                ans.push_back(node->val);
            }
        }
        return ans;
    }
};
```

> 后续遍历在BST中，是一种有序遍历。

**[102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)**

```cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        queue<TreeNode*>st;
        vector<vector<int>> ans;
        if(root) st.push(root);

        while(!st.empty()){
            int size = st.size();
            vector<int>vec;
            for(int i = 0; i < size; i++){
                TreeNode* node = st.front();
                st.pop();
                vec.push_back(node->val);
                if(node->left) st.push(node->left);
                if(node->right) st.push(node->right);
            }
            ans.push_back(vec);
        }
        return ans;
    }
};
```

---

## 例题

### 一般树的遍历

**[226. 翻转二叉树](https://leetcode.cn/problems/invert-binary-tree/)**

> 模板题。
>
> 对于[遍历]：对每一个非空节点，交换左右节点，然后再分别遍历子节点即可。
>
> 对于[分解]：对每一个非空节点，先处理该节点的左右子树，然后交换该节点的左右子树，最后返回根节点。
>
> 层次遍历（循环）：
>
> 每次取出结点，交换其左右结点，再放入左右结点。
>
> ：我会写翻转二叉树，但不是去不了谷歌系列题

**[101. 对称二叉树](https://leetcode.cn/problems/symmetric-tree/)**

> 二刷错误。没有正确处理空节点情况。
>
> 对于基础语法错误，还是要仔细看清楚。
>
> 一刷时候取巧用了特殊值标记。

**[116. 填充每个节点的下一个右侧节点指针](https://leetcode.cn/problems/populating-next-right-pointers-in-each-node/description/)**

> 层次遍历即可。
>
> 对于[遍历]：考虑连接当前节点的`left->next = right`，然后遍历left的左右，right的左右连接，以及考虑left的右节点指向right的左节点。

**[114. 二叉树展开为链表](https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/)**

> 这里void表示原题希望我们原地修改。
>
> 对于[分解]：先处理左右子树，然后保存子树，将左子树作为右子树，再遍历到右子树的未结点把原右子树的节点接到末端。

**[104. 二叉树的最大深度](https://leetcode.cn/problems/maximum-depth-of-binary-tree/)**

> 一刷二刷的层次遍历是比较熟悉。
>
> 用前序遍历时，注意空节点处理。

**[111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)**

> 这题一开始我就按照上面的思路写了一遍，但是忽略了本地中的定义，最小深度是从根节点到最小的叶子节点的最短路径上的节点数量。
>
> 所以当某个节点的左节点为空时不代表子树的高度就是1，应该分三类讨论：左节点为空，右节点不为空时为1+ lenr，同理 1 + lenl，如果都不为空时才是 1 + min( lenr, lenl)。

**[222. 完全二叉树的节点个数](https://leetcode.cn/problems/count-complete-tree-nodes/)**

> 模板题。
>
> 递归搜索即可。

**[110. 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)**

> 遍历每个节点，判断每一棵子树是否是平衡二叉树，单独计算左右子树的高度。
>
> 要重做。

**[257. 二叉树的所有路径](https://leetcode.cn/problems/binary-tree-paths/)**

> 初看的时候想到这是二叉树的前序遍历，遍历叶子节点的路径。
>
> 我怎么回退不同的路径呢？其实这题也可以说是回溯题，可以增加path存放遍历答案，再加上终止的条件。
>
> 回溯的几个要素：递归函数的参数，递归的终止条件，单层递归的逻辑。

**[404. 左叶子之和](https://leetcode.cn/problems/sum-of-left-leaves/)**

> 简单的遍历题，判断是不是左叶子节点即可。

**[112. 路径总和](https://leetcode.cn/problems/path-sum/)**

> 树的回溯题。
>
> 注意题目的值范围，可能包含负值的，所以在没有到叶子节点前，不能用sum> targetsum 剪枝。

**[🆙617. 合并二叉树](https://leetcode.cn/problems/merge-two-binary-trees/)**

> 暴力合并，细分节点的情况。

**[🆙236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)**

> 最近遇到的难题。
>
> 一个为空，一个不为空，找到了p，那么剩下的q不在为空的子树里，肯定是p作为了祖先节点。
>
> 如果从左子树找，右子树找都找到了，那么当前的节点肯定是最近的公共祖先。

**[652. 寻找重复的子树](https://leetcode.cn/problems/find-duplicate-subtrees/description/)**

> 判断重复值，想到了哈希表（map），遍历序列，发现子树是否重复出现。
>
> ==2 也避免重复放入答案。

[ 124. 二叉树中的最大路径和](https://leetcode.cn/problems/binary-tree-maximum-path-sum)

> 最大值的可能情况：
>
> 1. 当前节点的最大路径： max(自己，自己+左边，自己+右边，自己 + 左边 + 右边）
> 2. 当前节点作为子节点时的贡献：max(自己，自己+左边，自己+右边）
> 3. 后者相对前者，少了左右都存在的情况。因为作为子节点时，一条路如果同时包含左右，根就被包含了2次，不符合题目只出现一次的限制了。

[ 543. 二叉树的直径](https://leetcode.cn/problems/diameter-of-binary-tree)

> 这里只有一个点，就是需要计算树的节点数和路径差1，3个点两条边。

### 构造二叉树

**[654. 最大二叉树](https://leetcode.cn/problems/maximum-binary-tree/)**

> 这题和上一题有很大相似之处。
>
> 找到最大值，然后划分左右子树，再递归直到叶子节点。

> 这两题在优化上，注意类似用数组构造二叉树的题目，每次分隔尽量不要定义新的数组，而是通过下标索引直接在原数组上操作，这样可以节约时间和空间上的开销。

**[105. 从前序与中序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)**

> 如何通过两个遍历数组，分割数组，从而构造函数。

**[106. 从中序与后序遍历序列构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)**

> 中等题。
>
> 思路我们可以从后序遍历末尾找到根节点，再从中序遍历中找到根节点的左子树序列和右子树序列。
>
> 后序遍历除去根节点以后，剩余的部分，我们可以根据上面已经划分好的左子树序列长度和右子树序列长度，然后将后序遍历的数组划分为左子树和右子树。然后继续划分左子树部分和右子树部分，当作根节点。
>

**[889. 根据前序和后序遍历构造二叉树](https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-postorder-traversal/)**

> if(startp == endp)跳出。这里还是有一点晕。
>
> 在只有单个节点时，如果不跳出就溢出到了，后面startp > endp无法跳出。
>
> 叶子节点要直接跳出。
>
> 想换个思路做这种题。

### 归并排序

待做。

### BST

**[230. 二叉搜索树中第K小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/)**

> 在有size的时候，可以通过比较每个元素的排名，用log时间，类似二分来更快找到第k小的数。

**[538. 把二叉搜索树转换为累加树](https://leetcode.cn/problems/convert-bst-to-greater-tree/)**

> 能想到用中序遍历转换为有序序列求值，但是没有想到如何处理，实际上反中序遍历，然后添加值即可。
>
> 加一个pre记录前置值。

**[98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)**

> 一刷错在，左子树上每一个点都是小于根节点上的值，右子树上每一个点都是大于根节点上的值。
>
> 关键一个知识点：二叉搜索树的中序遍历是一个有序序列。
>
> 二刷没问题。
>
> 三刷已经忘记了通过中序遍历判断有序性。
>
> 直接遍历，需要判断pre是否完成初始化，加一个标志位判断是不是第一个节点，是的话不比较当前值和前驱结点的值。

**[700.二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/)**

> 注意题目中二叉搜索树这个条件，说明他已经是一个有序树了。

**[530. 二叉搜索树的最小绝对差](https://leetcode.cn/problems/minimum-absolute-difference-in-bst/)**

> 前提又是二叉搜索树，那么模仿上一题我们同样可以知道，最小的插值肯定连续的两个数，中序一遍序列然后遍历即可。
>
> result初始值可以设置为` INT_MAX`。

**[501. 二叉搜索树中的众数](https://leetcode.cn/problems/find-mode-in-binary-search-tree/)**

> 暴力遍历。
>
> 考虑中序遍历的有序性，相同的数连续出现，那我们可以用一个pre记录前驱节点，来判断相同count++，否则判断和前面的大小关系，比前面的大前面的答案都失效了，相同的众数可以放进去。
>
> 与前置变量相关的，考虑使用一个中间变量。
>
> 直接遍历出数组，依次判断。

**[🆙235. 二叉搜索树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-search-tree/)**

> 二叉搜索树是上面的一种，同样可以直接遍历到底。
>
> 如何利用二叉搜索树的特性：在答案肯定存在的前提下，且节点有序，那么可以从上向下查找。
>
> 如果当前的值大于二者，那么肯定在左节点，如果小于二者肯定都在右节点。否则就是找到了节点了，因为root->val 在[ p , q ]之间的话，p，q肯定在这之下。

**[701. 二叉搜索树中的插入操作](https://leetcode.cn/problems/insert-into-a-binary-search-tree/)**

> 找到空节点插入即可。

**[🆙669. 修剪二叉搜索树](https://leetcode.cn/problems/trim-a-binary-search-tree/)**

> 重做。
>
> 二刷：还是没做出来。
>
> 递归三要素，一遇到空节点我们返回值，二单层的递归逻辑是当前的值小于low，那只能去右节点找一个合适的节点放入当前的位置（二叉搜索树，右子树更小），如果大于high，那么去左子树找一个合适的节点放入。
>
> 接下来要将下一层处理完左子树的结果赋给root->left，处理完右子树的结果赋给root->right。
>
> 最后返回root节点。

**[🆙108. 将有序数组转换为二叉搜索树](https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/)**

> Link到106如何构造一棵二叉树。
>
> 题目给的nums实际上是数组的中序遍历结果，那么就可以从中间划分，取中间点作为根节点，左边剩余数组构造左子树，右边剩余数组构造右子树。
