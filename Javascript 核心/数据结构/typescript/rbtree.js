const black = "black";
const red = "red";
const left = "left";
const right = "right";
// 红黑树节点
/**
 *   key: number,
 *   left: RBTreeNode | null = null,
 *   right: RBTreeNode | null = null,
 *   parent: RBTreeNode | null = null,
 *   data: RBTree.RBTreeNode.data = null
 */
class RBTreeNode {
    constructor(key, left = null, right = null, parent = null, data = null) {
        this.color = red;
        this.key = key;
        this.left = left;
        this.right = right;
        this.parent = parent;
        this.data = data;
    }
}
// 红黑树
class RBTree {
    constructor(root = null) {
        this.root = root;
    }
    add(key, data) {
        if (this.root === null) {
            this.root = new RBTreeNode(key, null, null, null, data);
            this.root.color = black;
        }
        else {
            this.addProcess(key, data);
        }
    }
    // 向右旋转
    rRotate(node) {
        let t = node.left;
        if (t === null) {
            throw new Error('');
        }
        node.left = t.right;
        if (t.right !== null) {
            t.right.parent = node;
        }
        t.parent = node.parent;
        if (node.parent === null) {
            this.root = t;
        }
        else if (node.parent.right === node) {
            node.parent.right = t;
        }
        else if (node.parent.left === node) {
            node.parent.left = t;
        }
        t.right = node;
        node.parent = t;
        return this;
    }
    // 向左旋转
    lRotate(node) {
        let t = node.right;
        if (t === null) {
            return node;
        }
        node.right = t.left;
        if (t.left !== null) {
            t.left.parent = node;
        }
        t.parent = node.parent;
        if (node.parent === null) {
            this.root = t;
        }
        else if (node.parent.right === node) {
            node.parent.right = t;
        }
        else if (node.parent.left === node) {
            node.parent.left = t;
        }
        t.left = node;
        node.parent = t;
        return this;
    }
    addProcess(key, data) {
        let t = this.root;
        let tParentNode;
        let compNumber;
        do {
            tParentNode = t;
            compNumber = tParentNode.key - key;
            if (compNumber < 0) {
                t = t.right;
            }
            else if (compNumber > 0) {
                t = t.left;
            }
            else {
                t.data = data;
                return;
            }
        } while (t !== null);
        const newNode = new RBTreeNode(key, null, null, tParentNode, data);
        if (compNumber < 0) {
            tParentNode.right = newNode;
        }
        else if (compNumber > 0) {
            tParentNode.left = newNode;
        }
        this.fixAfterAdd(newNode);
        return this;
    }
    // 添加完成后调整
    fixAfterAdd(currentNode) {
        // 判断从子节点向上遍历调整的依据
        // 当前节点必须是 红色的
        // 父节点是红色的
        // 爷爷节点不能够为空
        let parentNode = currentNode.parent;
        let grandpaNode = currentNode.parent && currentNode.parent.parent;
        while (currentNode !== null // 必须有当节点
            && this.getColor(parentNode) === red // 当前节点的父节点是红色的
            && parentNode !== null
            && grandpaNode !== null // 当前节点的爷爷节点不能够为空
        ) {
            // 判断父节点是 2-3-4 树中的3节点还是4节点
            const parentNodeType = this.getParentNodeType(parentNode);
            const rotateType = this.getNodeType3RotateType(currentNode);
            if (parentNodeType === 3 && rotateType === "LL") {
                // 插入的是3节点 需要爷爷节点为基准向右旋转
                currentNode.parent && currentNode.parent.parent && this.rRotate(currentNode.parent.parent);
                currentNode.parent ? currentNode.parent.color = black : "";
                currentNode.parent && currentNode.parent.right ? currentNode.parent.right.color = red : "";
            }
            else if (parentNodeType === 3 && rotateType === "LR") {
                // 插入的节点是3节点，需要以父亲节点为基准向右左旋转
                currentNode.parent && this.lRotate(currentNode.parent);
                // 以爷爷节点为基准向右旋转
                currentNode.parent && this.rRotate(currentNode.parent);
                currentNode.color = black;
                currentNode.right ? currentNode.right.color = red : "";
            }
            else if (parentNodeType === 3 && rotateType === "RR") {
                // 插入的节点是3节点，需要以爷爷节点为基准向右右旋转
                currentNode.parent && currentNode.parent.parent && this.lRotate(currentNode.parent.parent);
                currentNode.parent ? currentNode.parent.color = black : "";
                currentNode.parent && currentNode.parent.left ? currentNode.parent.left.color = red : "";
            }
            else if (parentNodeType === 3 && rotateType === "RL") {
                // 插入的节点是3节点，需要以父亲节点为基准向右右旋转
                currentNode.parent && this.rRotate(currentNode.parent);
                // 以爷爷节点为基准向左旋转
                currentNode.parent && this.lRotate(currentNode.parent);
                currentNode.color = black;
                currentNode.left ? currentNode.left.color = red : "";
            }
            else {
                //  插入的是4节点
                currentNode.parent && currentNode.parent.parent ? currentNode.parent.parent.color = red : "";
                currentNode.parent && currentNode.parent.parent && currentNode.parent.parent.left ? currentNode.parent.parent.left.color = black : "";
                currentNode.parent && currentNode.parent.parent && currentNode.parent.parent.right ? currentNode.parent.parent.right.color = black : "";
            }
            if (parentNodeType === 3) {
                // 插入的是 3节点 不需要继续向上遍历
                return;
            }
            else {
                // console.log('继续向上遍历', currentNode)
                // 继续向上遍历调整
                currentNode = (currentNode.parent && currentNode.parent.parent);
                parentNode = currentNode.parent;
                grandpaNode = parentNode ? parentNode.parent : null;
                // console.log('currentNode: ', currentNode)
                // console.log("parentNode",parentNode)
                // console.log('grandpaNode: ', grandpaNode)
                // debugger;
            }
        }
        this.root ? this.root.color = black : "";
    }
    getParentNodeType(node) {
        let siblingNodeColor;
        if (node.parent === null) {
            throw new Error('getNodeType node.parent === null');
        }
        else if (node === node.parent.left) {
            // 当前节点是父节点的左子节点
            siblingNodeColor = this.getColor(node.parent.right);
        }
        else {
            // 当前节点是父节点的右子节点
            siblingNodeColor = this.getColor(node.parent.left);
        }
        if (siblingNodeColor === red) {
            return 4;
        }
        else {
            return 3;
        }
    }
    // 获取插入3节点后的旋转状态
    getNodeType3RotateType(node) {
        let parentNode = node.parent;
        let grandpaNode = parentNode.parent;
        if (parentNode === grandpaNode.left && node === parentNode.left) {
            return "LL";
        }
        else if (parentNode === grandpaNode.left && node === parentNode.right) {
            return "LR";
        }
        else if (parentNode === grandpaNode.right && node === parentNode.left) {
            return "RL";
        }
        else if (parentNode === grandpaNode.right && node === parentNode.right) {
            return "RR";
        }
        else {
            throw new Error('getNodeType3RotateType 错误 没有获取到准确的旋转方式');
        }
    }
    // 删除指定节点的情况
    /**
     *
    删除操作 先删除 在调整
        找到匹配的节点 删除
            删除的节点不是叶子节点
                删除的节点有一个子节点， 那么用这个子节点替代 递归的删除这个替代节点
                删除的节点如果右 2个子节点，找到后继节点，替代 递归的删除这个替代节点
            如果删除的节点是叶子节点 删除的是叶子节点，直接删除
    
    
    
    如果删除的节点是 黑色，那么这个节点只能够是 2-3-4 树中的 2节点 or 三节点
    如果是2-3-4树中的三节点 可以直接用用子节点替换后 修改颜色
    
    如果是 2-3-4书中的2节点，那么需要查看父节点是 2-3-4 树中的哪一个
    
    
    删除 2-3-4树节点中的 2 节点 父节点是 2 节点的情况
    
    删除 2-3-4 树节点中的 2 节点 父节点是 3 节点的情况
    
    删除 2-3-4 树中的 2 节点 父节点是 4 节点的情况
    
    获取 需要删除的节点执行删除
    
    1： 实际的删除只能够发生在 所在高度是 0 层的节点上
    2： 如果删除的节点高度 > 1层，那么需要查找删除节点的后继节点，
            把后继节点的key ,value 替换到之前要删除的节点上，然后删除后继节点
    3： 后继节点如果是一个 3节点 那么直接用子节点替换
    4： 如果后继节点是一个 2 节点 ，那么需要已删除节点为 基础点 调整节点
        4.1 找到真正的兄弟节点
            4.1.1 在红黑树中 兄弟节点是黑色的情况就是真正的兄弟节点
                    如果兄弟节点是红色 表示父节点是一个3节点，可以通过衣服节点为基准节点向 后继节点旋转 后得到正真的兄弟节点
        4.2 如果兄弟节点是 3or4 节点 那么就通过旋转借
            4.2.1 如果后继节点是父节点的左侧子节点 [兄弟接单是右侧子节点]
                4.2.1.1 如果兄弟节点是一个左倾的3节点 or 4节点
                        4.2.1.1.1 直接以后继节点的父节点为基准节点向左旋转
                        4.2.1.1.2 修改颜色实现黑平衡
                4.2.1.2 如果兄弟节点是一个右倾的3节点
                        4.2.1.2.1 首先兄弟节点为基准向右旋转
                        4.2.1.2.1 在以后继节点的父节点为基准向左旋转
            4.2.2 如果后继节点是父节点的右侧子节点
    
        4.4 如果兄弟节点是2 节点 那么就 设置兄弟节点的颜色是 红色一起损失一个黑色节点
        4.5 然后向上递归的继续调整节点，一般而言只有第一次兄弟节点没有子节点的情况
    5 调整完成后 删除掉后继节点；
    
    
    
    
     */
    /***
     * 删除节点
     */
    removeNode(key) {
        if (key === undefined) {
            return null;
        }
        let removeNode = this.getNode(key);
        if (removeNode === null) {
            return null;
        }
        const oldValue = removeNode.data;
        this.removeNodeProcess(removeNode);
        return oldValue;
    }
    /**
     * 删除指定的节点
     */
    removeNodeProcess(RBNode) {
        /**
         * 被删除的节点情况分析
         * 1： 节点两个子节点 当前节点不是真正需要被删除的节点，需要找后继节点用来替代删除；把后继节点的值赋值给被删除的节点
         * 2： 节点有一个子节点 通过用子节点替换删除节点实现删除
         * 3： 节点没有子节点
         *      3.1 节点没有父节点 节点 === root  设置 root = null 实现删除
         *      3.2 节点没有父节点 节点 === 是最底层的叶子节点 通过直接删除实现 删除前需要先调整
         */
        // 有两个子节点 通过查找后继节点 替换数据
        // 真正删除的是 后继节点
        if (RBNode.left !== null && RBNode.right !== null) {
            // 有两个子节点的情况
            let successor = this.getSuccessor(RBNode);
            //  数据替换
            RBNode.key = successor.key;
            RBNode.data = successor.data;
            RBNode = successor;
        }
        // 找到替代节点
        let replacementNode = RBNode.left ? RBNode.left : RBNode.right;
        // 进入真正删除的阶段
        if (replacementNode !== null) {
            // 只有一个子节点的情况 前一个 if 已经隐式的排除了可能有两个子节点的情况
            // 用子节点替换删除节点
            replacementNode.parent = RBNode.parent;
            if (RBNode.parent === null) {
                this.root = replacementNode;
            }
            else {
                RBNode.parent.left === RBNode
                    ? RBNode.parent.left = replacementNode
                    : RBNode.parent.right = replacementNode;
            }
            // 如果删除的是黑色的节点 调整
            if (RBNode.color === black) {
                this.fixAfterDel(replacementNode);
            }
        }
        else if (RBNode.parent === null) {
            // 删除节点是 根节点的情况，前面的条件判断隐式的排除了 有子节点的情况
            this.root = null;
        }
        else {
            // 删除节点是叶子节点的情况 前面的条件判断隐式的排除了 有子节点的情况
            if (RBNode.color === black) {
                this.fixAfterDel(RBNode);
            }
            RBNode.parent.left === RBNode
                ? RBNode.parent.left = null
                : RBNode.parent.right = null;
        }
    }
    // 修改后的版本
    fixAfterDel(adjustmentNode) {
        let siblingNode;
        // (adjustmentNode.parent !== null 表示不是roo节点
        while (adjustmentNode.parent !== null && adjustmentNode.color === black) {
            // 隐式的表示 调整节点子树会缺少一个黑高
            // 获取调整节点的兄弟节点
            // 调整节点是父节点的左侧子节点
            if (adjustmentNode === adjustmentNode.parent.left) {
                siblingNode = adjustmentNode.parent.right;
                if (this.getColor(siblingNode) === red) {
                    siblingNode ? siblingNode.color = adjustmentNode.parent.color : "";
                    adjustmentNode.parent.color = red;
                    this.lRotate(adjustmentNode.parent);
                    siblingNode = adjustmentNode.parent.right;
                }
                // 兄弟节点没有借的
                // 借的前提条件是 2-3-4 树中的兄弟节点是 3 / 4 节点才有的借，和2-3-4 树中的子节点没有关系
                if (siblingNode && this.getColor(siblingNode.left) === black && this.getColor(siblingNode.right) === black) {
                    // 隐含的表示 兄弟节点是一个2节点
                    // 不管是没有子节点 还是 子节点的颜色===black
                    siblingNode.color = red;
                    adjustmentNode = adjustmentNode.parent;
                }
                else if (siblingNode && this.getColor(siblingNode.left) === red && this.getColor(siblingNode.right) === black) {
                    // 隐含的表示 兄弟节点是 右倾的3节点
                    // 首先向右旋转
                    siblingNode.color = red;
                    siblingNode.left ? siblingNode.left.color = black : "";
                    this.rRotate(siblingNode);
                    siblingNode = adjustmentNode.parent.right;
                    // 父节点向左旋
                    // 兄弟节点替换父节点的位置 所以颜色必须同父节点的颜色
                    siblingNode ? siblingNode.color = adjustmentNode.parent.color : "";
                    adjustmentNode.parent.color = black; // 调整节点子树向父节点借一个黑色节点 所以父节点的颜色是黑色
                    siblingNode && siblingNode.right ? siblingNode.right.color = black : ''; // 兄弟节点替代了父节点的位置，兄弟节点是黑色的缺少了一个黑高，所以把兄弟节点右子节点设置为黑色
                    this.lRotate(adjustmentNode.parent);
                    adjustmentNode = this.root; // 停止遍历
                }
                else if (siblingNode && this.getColor(siblingNode.right) === red) {
                    // 隐含的表示 兄弟接单是 左倾的3节点 or 4节点
                    // 父节点向左旋
                    // 兄弟节点替换父节点的位置 所以颜色必须同父节点的颜色
                    siblingNode ? siblingNode.color = adjustmentNode.parent.color : "";
                    adjustmentNode.parent.color = black; // 调整节点子树向父节点借一个黑色节点 所以父节点的颜色是黑色
                    siblingNode && siblingNode.right ? siblingNode.right.color = black : ''; // 兄弟节点替代了父节点的位置，兄弟节点是黑色的缺少了一个黑高，所以把兄弟节点右子节点设置为黑色
                    this.lRotate(adjustmentNode.parent);
                    adjustmentNode = this.root; // 停止遍历
                }
                else {
                    console.error('error fixAfterDel 兄弟节点 === null: ', siblingNode);
                    throw new Error('error fixAfterDel 兄弟节点 === null: ');
                }
            }
            else {
                // 调整节点是父节点的右侧子节点
                siblingNode = adjustmentNode.parent.left;
                if (siblingNode && siblingNode.color === red) {
                    siblingNode.color = black;
                    adjustmentNode.parent.color = red;
                    this.rRotate(adjustmentNode.parent);
                    siblingNode = adjustmentNode.parent.left;
                }
                if (siblingNode && this.getColor(siblingNode.left) === black && this.getColor(siblingNode.right) === black) {
                    // 兄弟节点没有子节点
                    // 隐含的表示 兄弟节点是 2-3-4 树中的2节点
                    // 在黑红书中 兄弟节点没有子节点 or 子节点的颜色是black 都表示 兄弟节点是 2-3-4树中的2节点
                    siblingNode.color = red;
                    adjustmentNode = adjustmentNode.parent;
                }
                else if (siblingNode && this.getColor(siblingNode.left) === black && this.getColor(siblingNode.right) === red) {
                    // 兄弟节点在 2-3-4树中是一个 左倾的 3节点
                    // 向左旋转
                    siblingNode.color = red;
                    siblingNode.right ? siblingNode.right.color = black : "";
                    this.lRotate(siblingNode);
                    siblingNode = adjustmentNode.parent.left;
                    // 以父节点为基准点向右旋转
                    siblingNode ? siblingNode.color = adjustmentNode.parent.color : "";
                    adjustmentNode.parent.color = black;
                    siblingNode && siblingNode.left ? siblingNode.left.color = black : '';
                    this.rRotate(adjustmentNode.parent);
                    adjustmentNode = this.root; // 停止遍历
                }
                else if (siblingNode && this.getColor(siblingNode.left) === red) {
                    // 兄弟节点是一个 右倾的3节点 or 4节点
                    // 可以直接旋转 实现向兄弟节点借元素
                    // 兄弟节点有左侧子节点
                    // 以父节点为基准点向右旋转
                    siblingNode ? siblingNode.color = adjustmentNode.parent.color : "";
                    adjustmentNode.parent.color = black;
                    siblingNode && siblingNode.left ? siblingNode.left.color = black : '';
                    this.rRotate(adjustmentNode.parent);
                    adjustmentNode = this.root; // 停止遍历
                }
                else {
                    console.error('error fixAfterDel 兄弟节点 === null: ', siblingNode);
                    throw new Error('error fixAfterDel 兄弟节点 === null: ');
                }
            }
        }
        // 隐式的表示 如果调整节点红色 直接设置成为黑色
        adjustmentNode.color = black;
    }
    /**
     * 查找后继节点
     * @param node
     */
    getSuccessor(node) {
        let successor = node.right;
        while (successor.left !== null) {
            successor = successor.left;
        }
        return successor;
    }
    /**
     * 获取节点的左侧字子节点
     */
    leftOf(node) {
        return node.left;
    }
    // 获取匹配的节点
    getNode(key) {
        // 边界情况
        if (key === null || key === undefined) {
            return null;
        }
        let currentNode = this.root;
        if (currentNode === null) {
            return null;
        }
        do {
            if (currentNode.key === key) {
                return currentNode;
            }
            else if (currentNode.key < key) {
                currentNode = currentNode.right;
            }
            else if (currentNode.key > key) {
                currentNode = currentNode.left;
            }
        } while (currentNode !== null);
        return currentNode;
    }
    getColor(node) {
        if (node === null) {
            return black;
        }
        else {
            return node.color;
        }
    }
}
/**
 * 检验树是否是一个红黑树
 */
function isRBTree(tree) {
    if (tree.root === null) {
        return;
    }
    // 根节点必须是红色的
    if (tree.root.color !== black) {
        throw new Error(`[粗哦呜]: 红黑树root节点的颜色不是黑色`);
    }
    // 检查黑高是否相同
    getBlackHeight(tree.root);
    // 检查红色节点的父节点不能够是红色的节点/
    // 节点的颜色只能够是黑色or红色
    checkColor(tree.root);
    // 检查 根节点的值 > left && 根节点的值 < right
    checkSequence(tree.root);
}
// 获取树的黑高
function getBlackHeight(node) {
    if (node === null) {
        return -1;
    }
    else {
        let leftHeight = getBlackHeight(node.left);
        let rightHeight = getBlackHeight(node.right);
        if (leftHeight === rightHeight && node.color === red) {
            return leftHeight;
        }
        else if (leftHeight === rightHeight && node.color === black) {
            return leftHeight + 1;
        }
        else {
            console.error('黑高不同的节点： ', node);
            throw new Error(`黑高不同的节点：${node.key}`);
        }
    }
}
// 检查简单的颜色是否符合规则
function checkColor(node) {
    if (node === null) {
        return;
    }
    if (node.color !== red && node.color !== black) {
        throw Error(`[错误] 节点的颜色 不是红色or黑色 节点的值===${node.key}`);
    }
    if (node.color === red
        && (node.left ? node.left.color === red : false || node.right ? node.right.color === red : false)) {
        // 非法
        throw Error(`[错误] 节点的颜色是非法的右有两个红色的节点： 节点的值===${node.key}`);
    }
    else {
        // 合法的继续 向下遍历啊 
        checkColor(node.left);
        checkColor(node.right);
    }
}
// 检查节点 和 全部子节点的 关键值顺序是否准确
function checkSequence(node) {
    if (node === null)
        return;
    if (node.left && node.left.key < node.key) {
        checkSequence(node.left);
    }
    else if (node.left) {
        console.error("节点和左侧子节点关键值的顺序不准确 左侧子节点的值 不小于 节点的关键值: ", node);
        throw new Error('节点和左侧子节点关键值的顺序不准确 左侧子节点的值 不小于 节点的关键值');
    }
    if (node.right && node.right.key > node.key) {
        checkSequence(node.right);
    }
    else if (node.right) {
        console.error("节点和右侧子节点关键值的顺序不准确 右侧子节点的值 不大于 节点的关键值: ", node);
        throw new Error('节点和右侧子节点关键值的顺序不准确 右侧子节点的值 不大于 节点的关键值');
    }
}
export { RBTreeNode, RBTree, isRBTree };
