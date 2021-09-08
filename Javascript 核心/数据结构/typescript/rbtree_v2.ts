

// 类型声明
declare namespace RBTree {
    interface RBTreeNode{
        key: number;
        data: RBTreeNode.Data;
        color: RBTreeNode.Color;
        left: RBTreeNode | null;
        right: RBTreeNode | null;
        parent: RBTreeNode | null;
    }
    namespace RBTreeNode{
        type Data = number | null;
        type Color =  "black" | "RED";
    }

    interface RBTree {
        root: RBTreeNode | null;
        rRotate: { (node: RBTreeNode): RBTree};
        lRotate: { (node: RBTreeNode): RBTree};
        add: { (key: number): RBTree};
        addProcess: { (key: number): RBTree};
        fixAfterAdd: { (node: RBTreeNode): RBTree};
        getColor: { (node: RBTreeNode): RBTreeNode.Color}
        setColor: { (node: RBTreeNode, color: RBTreeNode.Color): RBTree}
    }
}

// 常量
const BLACK = "black";
const RED = "RED";

/**
 * 红黑树节点类
 */
class RBTreeNode implements RBTree.RBTreeNode{
    key: number;
    data: RBTree.RBTreeNode.Data ;
    color: RBTree.RBTreeNode.Color;
    left: RBTree.RBTreeNode | null;
    right: RBTree.RBTreeNode | null;
    parent: RBTree.RBTreeNode | null;
    constructor(
        key: number | null = null,
        data: RBTree.RBTreeNode.Data = null,
        color: RBTree.RBTreeNode.Color = RED,
        left: RBTree.RBTreeNode | null = null,
        right: RBTree.RBTreeNode | null = null,
        parent: RBTree.RBTreeNode | null = null
    ){
        if(key === null){
            throw new Error('[初始化红黑树节点失败]: 非法的key值')
        }

        this.key = key;
        this.data = data;
        this.color = color;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
}

/***
 * 红黑树的类
 */
class RBTree implements RBTree.RBTree{
    root: RBTreeNode | null;
    constructor(root: RBTreeNode | null = null){
        this.root = root;
    }
    /**
     * 向右旋转
     * @param node 
     * @returns 
     */
    rRotate(datumPointNode: RBTreeNode): RBTree{
        const newTopNode = datumPointNode.left;

        if(newTopNode === null){
            throw new Error('[向右旋转错误]: 基准节点的左子节点 === null')
        }

        // 更新 基准节点的左子节点指针
        datumPointNode.left = newTopNode.right;
        datumPointNode.left !== null ? datumPointNode.left.parent = datumPointNode : "";

        // 更新 新顶端节点的父节点指针指向
        newTopNode.parent = datumPointNode.parent
        if(datumPointNode.parent === null){
            this.root = newTopNode;
        }else if(datumPointNode === datumPointNode.parent.left){
            datumPointNode.parent.left = newTopNode;
        }else if(datumPointNode === datumPointNode.parent.right){
            datumPointNode.parent.right = newTopNode;
        }

        // 更新 基准节点的父结点指针指向
        datumPointNode.parent = newTopNode;
        newTopNode.right = datumPointNode;

        return this;
    };

    /**
     * 向左旋转
     * @param node 
     * @returns 
     */
    lRotate(datumPointNode: RBTreeNode): RBTree{
        let newTopNode = datumPointNode.right;
        if(newTopNode === null){
            throw new Error('[向右旋转错误]: 基准节点的右子节点 === null')
        }

        // 更新 基准节点的右子节点指针
        datumPointNode.right = newTopNode.left;
        datumPointNode.right !== null ? datumPointNode.right.parent = datumPointNode : "";

        // 更新 新顶点的父节点指针
        newTopNode.parent = datumPointNode.parent;
        if(datumPointNode.parent === null){
            this.root = newTopNode
        }else if(datumPointNode.parent.left === datumPointNode){
            datumPointNode.parent.left = newTopNode;
        }else if(datumPointNode.parent.right === datumPointNode){
            datumPointNode.parent.right = newTopNode;
        }

        // 更新 基准节点的父节点指针
        datumPointNode.parent = newTopNode;
        newTopNode.left = datumPointNode;

        return this;
    }

    /**
     * 添加新的关键字
     * @param key 
     * @returns 
     */
    add(key: number, data: number = key): RBTree{
        
        if(this.root === null){
            this.root = new RBTreeNode(key, data)
            this.setColor(this.root, BLACK)
        }else{
            this.addProcess(key, data)
        }


        return this;
    }

    /**
     * 插入新的节点
     * @param key 
     * @param data 
     * @returns 
     */
    addProcess(key: number, data: number = key): RBTree{
        // 找到叶子节点
        let leafNode: RBTreeNode | null = this.root;
        let parentNode: RBTreeNode = this.root as RBTreeNode;
        let comp: number = 0;
        
        while(leafNode !== null) {
            parentNode = leafNode;
            comp = leafNode.key - key;
            if(comp === 0){
                leafNode.data = data;
                return this;
            }else if(comp < 0){
                leafNode = leafNode.right;
            }else{
                leafNode = leafNode.left;
            }    
        }
        
        leafNode = new RBTreeNode(key, data)
        leafNode.parent = parentNode;

        if(comp < 0){
            parentNode.right = leafNode;
        }else{
            parentNode.left = leafNode;
        }
        
        this.fixAfterAdd(leafNode)
        
        return this;
    }

    /**
     * 插入后调整
     * 插入后可能会导致出现联系的红节点，所以需要调整
     * @param fixNode 
     * @returns 
     */
    fixAfterAdd(fixNode: RBTreeNode): RBTree{
        
        let parentNode = fixNode.parent;
        
        // 
        while(
            // parentNode !== this.root //父节点不能够是 更节点
            // && this.getColor(parentNode) === RED // 父节点是红色的 需要调整 父节点是黑色的不需要调整
            this.getColor(parentNode) === RED // 父节点是红色的 需要调整 父节点是黑色的不需要调整
            && parentNode !== null
            && parentNode.parent !== null
        ){
            let grandpaNode = parentNode && parentNode.parent;
            if(
                parentNode === grandpaNode.left
                && this.getColor(grandpaNode.right) === BLACK 
                && fixNode === parentNode.left
            ){  
                // 调整分析 
                // 父节点的兄弟节点是黑色 表示表示父节点是2-3-4树中的3节点
                // 父节点是爷爷的左子节点 === L
                // 调整节点是父节点的左子节点 === L
                // 调整操作
                this
                .setColor(parentNode, BLACK)
                .setColor(grandpaNode, RED)
                .rRotate(grandpaNode)
         
                break;
            }else if(
                parentNode === grandpaNode.left
                && this.getColor(grandpaNode.right) === BLACK
                && fixNode === parentNode.right
            ){
                // 调整分析
                // 父节点的兄弟节点是黑色 表示父节点是2-3-4树中的3节点
                // 父节点是爷爷的左子节点 === L
                // 调整节点是父节点的右子节点 === R
                // 调整操作
                this
                .setColor(fixNode, BLACK)
                .setColor(grandpaNode, RED)
                .lRotate(parentNode)
                .rRotate(grandpaNode)
           
                break;

            }else if(  
                parentNode === grandpaNode.right
                && this.getColor(grandpaNode.left) === BLACK 
                && fixNode === parentNode.left
            ){
                // 调整分析
                // 父节点的兄弟节点是黑色 表示父节点是 2-3-4 树中的3节点
                // 父节点是爷爷的右子节点 === R
                // 调整节点是付姐带你的左子节点 === L
                // 调整操作
     
                this
                .setColor(fixNode, BLACK)
                .setColor(grandpaNode, RED)
                .rRotate(parentNode)
                .lRotate(grandpaNode)
                break;
            }else if(
                parentNode === grandpaNode.right
                && this.getColor(grandpaNode.left) === BLACK
                && fixNode === parentNode.right
            ){
                // 调整分析
                // 父节点的兄弟节点是黑色 表示父节点是 2-3-4树中的3节点
                // 父节点是爷爷节点的右子节点 === R
                // 调整节点是父节点的右子节点 === R
                // 调整操作
                this
                .setColor(parentNode, BLACK)
                .setColor(grandpaNode, RED)
                .lRotate(grandpaNode)
                break;
            }else if(
                (parentNode === grandpaNode.right && this.getColor(grandpaNode.left) === RED)
                || (parentNode === grandpaNode.left && this.getColor(grandpaNode.right) === RED)
            ){
                // 父节点的兄弟节点是红色 表示父节点是 2-3-4树中的4节点
                // 通过修改颜色完成
                const siblingNode = parentNode === grandpaNode.left ? grandpaNode.right : grandpaNode.left;
                this
                .setColor(parentNode, BLACK)
                .setColor(parentNode === grandpaNode.left ? grandpaNode.right : grandpaNode.left, BLACK)
                .setColor(grandpaNode, RED)

                fixNode = grandpaNode;
                parentNode = fixNode.parent;
            }else{
                throw new Error("[错误添加后修正错误]：不属于任意一种情况")
            }
        }

        // 根节点必须设置为黑色
        this.root ? this.root.color = BLACK : "";
        return this;
    }

    
    /**
     * 删除指定关键值的节点
     * @param key 
     */
    removeNode(key: number){
        const removeNode = this.getNode(key)

        if(removeNode === null){
            return null
        }else{
            this.removeNodeProcess(removeNode)
            return removeNode.data;
        }
    }

    /**
     * 删除节点
     * @param removeNode 
     */
    removeNodeProcess(removeNode: RBTreeNode){
        // 如果有两个字节点
        // 找到后继节点替换数据
        // 设置后继节点是删除节点
        if(removeNode.left !== null && removeNode.right !== null){
            let successor = this.getSuccessor(removeNode)
            removeNode.key = successor.key;
            removeNode.data = successor.data;
            removeNode = successor;
        }
        
        let replacementNode = removeNode.right === null ? removeNode.left : removeNode.right;
        if(replacementNode !== null){
            // 如果删除节点有子节点的情况
            // 把子节点的父指针指向删除节点的父指针
            replacementNode.parent = removeNode.parent;
            if(removeNode.parent === null){
                // 删除节点是root
                this.root = replacementNode
            }else if(removeNode === removeNode.parent.right){
                removeNode.parent.right = replacementNode
            }else if(removeNode === removeNode.parent.left){
                removeNode.parent.left = replacementNode;
            } 

            if(this.getColor(removeNode) === BLACK){
                this.fixAfterDel(replacementNode)
            }

        }else if(removeNode.parent === null){
            // 删除节点没有子节点 
            // 删除没有父节点 表示删除节点是root
            this.root = null;
        }else{
            // 删除节点没有子节点
            // 删除节点有父节点
            // 所以删除节点是叶子节点
            // 先调整
            if(this.getColor(removeNode) === BLACK){
                this.fixAfterDel(removeNode)
            }

            // 删除
            // 通过设置父对象相关子对象的指针 = null 实现
            if(removeNode === removeNode.parent.left){
                removeNode.parent.left = null;
            }else if(removeNode === removeNode.parent.right){
                removeNode.parent.right = null;
            }
        }
    }

    /**
     * 删除后调整
     * @param fixNode 
     */
    fixAfterDel(fixNode: RBTreeNode){
        // 调整的思路
        // 调整发生在删除了一个黑色节点的情况
        // 所以会导致子树的黑高不同
        // 为了能够平衡，可以采用的方法就是 
        // 调整节点是红色把红色的节点设置为黑色
        // 调整节点是黑色 同时兄弟节点有借[兄弟节点是2-3-4树中的 3节点or 4节点] 向兄弟借用一个黑色的接待你来替换
        // 调整节点是黑色 兄弟节点没有借的[兄弟节点是2-3-4树中的 2节点] 兄弟子树同样减少一个黑色节点

        // 从下往上处理
        while(
            this.getColor(fixNode) === BLACK
            && fixNode !== this.root
            && fixNode.parent
        ){
            let sibling: RBTreeNode | null;
            if(fixNode === fixNode.parent.left){
                // 调整节点是父节点的左子节点
                // 获取兄弟节点
                sibling = fixNode.parent.right;

                // 获取真正的兄弟节点
                if(this.getColor(sibling) === RED){
                    // 兄弟节点是红色的
                    // 以父节点向左旋转
                    this
                    .setColor(fixNode.parent, RED)
                    .setColor(sibling, BLACK)
                    .lRotate(fixNode.parent)
                    sibling = fixNode.parent.right;
                }

                if(sibling === null){
                    throw new Error('[错误兄弟节点===null]')
                }

                if(this.getColor(sibling.left) === BLACK && this.getColor(sibling.right) === BLACK){
                    // 兄弟节点是一个2节点 没得借
                    // 共损一个取得平衡
                    this.setColor(sibling, RED)
                    // 更新修正节点为父节点 继续修正
                    fixNode = fixNode.parent
                }else if(this.getColor(sibling.left) === RED && this.getColor(sibling.right) === BLACK){
                    // 兄弟节点是一个右倾的3节点
                    this
                    .setColor(sibling, RED)
                    .setColor(sibling.left, BLACK)
                    .rRotate(sibling)
                    sibling =  fixNode.parent.right

                    if(sibling === null){
                        throw new Error('[错误兄弟节点===null]')
                    }
                    this
                    .setColor(sibling, fixNode.parent.color)
                    .setColor(fixNode.parent, BLACK)
                    .setColor(sibling.right, BLACK)
                    .lRotate(fixNode.parent)
                    break;
                }else if(this.getColor(sibling.right) === RED){
                    // 兄弟节点可能是 左倾的2节点
                    // 可能是 4节点
                    this
                    .setColor(sibling, fixNode.parent.color)
                    .setColor(fixNode.parent, BLACK)
                    .setColor(sibling.right, BLACK)
                    .lRotate(fixNode.parent)
                    break;
                }else{
                    throw new Error(`[错误删除后调整错误]：
                                    调整节点是父节点的左子节点但是兄弟节点不是2节点，
                                    也不是右倾的3节点，也不是左倾的三节点,也不是4节点`
                                    )
                }

            }else{
                // 调整节点是父节点的右子节点
                sibling = fixNode.parent.left;
                if(this.getColor(sibling) === RED){
                    this
                    .setColor(sibling, BLACK)
                    .setColor(fixNode.parent, RED)
                    .rRotate(fixNode.parent)
                    sibling = fixNode.parent.left;
                } 
                
                if(sibling === null){
                    throw new Error('[错误兄弟节点===null]')
                }

                if(this.getColor(sibling.left) === BLACK && this.getColor(sibling.right) === BLACK){
                    this
                    .setColor(sibling, RED)
                    fixNode = fixNode.parent;
                }else if(this.getColor(sibling.left) === BLACK && this.getColor(sibling.right) === RED){
                    this
                    .setColor(sibling, RED)
                    .setColor(sibling.right, BLACK)
                    .lRotate(sibling)

                    sibling = fixNode.parent.left;

                    if(sibling === null){
                        throw new Error('[错误兄弟节点===null]')
                    }

                    this
                    .setColor(sibling, fixNode.parent.color)
                    .setColor(fixNode.parent, BLACK)
                    .setColor(sibling.left, BLACK)
                    .rRotate(fixNode.parent)
                    break;
                }else if(this.getColor(sibling.left) === RED){
                    this
                    .setColor(sibling, fixNode.parent.color)
                    .setColor(fixNode.parent, BLACK)
                    .setColor(sibling.left, BLACK)
                    .rRotate(fixNode.parent)
                    break;
                }else{
                    throw new Error(`[错误删除后调整错误]：
                    调整节点是父节点的右子节点但是兄弟节点不是2节点，
                    也不是右倾的3节点，也不是左倾的三节点,也不是4节点`
                    )
                }
            }
        }

        // 如果调整节点是红色 直接设置为黑色即可完成对黑高的修复
        this.setColor(fixNode, BLACK)
    }

    /**
     * 查询节点的后继节点
     * @param node 
     * @returns 
     */
    getSuccessor(node: RBTreeNode): RBTreeNode{
        let successor: RBTreeNode

        if(node.right === null){
            throw new Error('[获取后继节点失败]: node.right === null')
        
        }
        successor = node.right
        while(successor.left !== null){
            successor = successor.left;
        }

        return successor
    }

    /**
     * 查找匹配的node
     * @param key 
     */
    getNode(key: number): RBTreeNode | null{
        let removeNode: RBTreeNode | null = this.root;
        while(removeNode !== null && removeNode.key !== key){
            removeNode = removeNode.key > key ? removeNode.left : removeNode.right;
        }
        return removeNode
    }

    /**
     * 获取节点的颜色
     * 节点===null 同样返回黑色
     * 为调整的关键颜色是红色
     * 没有节点 or 节点的颜色是黑色 不会影响调整依据
     * @param node 
     * @returns 
     */
    getColor(node: RBTreeNode | null): RBTree.RBTreeNode.Color{
        // let color: RBTree.RBTreeNode.Color
        // if(node === null){
        //     return BLACK
        // }else{
        //     return node.color
        // }
        return node === null ? BLACK : node.color;
    }

    /**
     * 设置节点的颜色
     * @param node 
     * @param color 
     */
    setColor(node: RBTreeNode | null, color: RBTree.RBTreeNode.Color): RBTree{
        if(node === null){
            throw new Error("[设置颜色错误：]参数 node === null")
        }else{
            node.color = color
        }
        return this;
    }
}



/**
 * 检验树是否是一个红黑树
 */
 function isRBTree(tree: RBTree.RBTree){
    if(tree.root === null){
        return
    } 

    // 根节点必须是红色的
    if(tree.root.color !== BLACK){
        throw new Error(`[粗哦呜]: 红黑树root节点的颜色不是黑色`)
    }
    
    // 检查黑高是否相同
    getBlackHeight(tree.root)

    // 检查红色节点的父节点不能够是红色的节点/
    // 节点的颜色只能够是黑色or红色
    checkColor(tree.root)

    // 检查 根节点的值 > left && 根节点的值 < right
    checkSequence(tree.root)

}

// 获取树的黑高
function getBlackHeight(node: RBTree.RBTreeNode | null): number{
    if(node === null){
        return -1;
    }else{
        let leftHeight = getBlackHeight(node.left)
        let rightHeight = getBlackHeight(node.right)

        if(leftHeight === rightHeight && node.color === RED){
            return leftHeight
        }else if(leftHeight === rightHeight && node.color === BLACK){
            return leftHeight + 1;
        }else{
            console.error('黑高不同的节点： ', node)
            throw new Error(`黑高不同的节点：${node.key}`) 
        }
    }
}



// 检查简单的颜色是否符合规则
function checkColor(node: RBTree.RBTreeNode | null){
    if(node === null){
        return ;
    }

    if(node.color !== RED && node.color !== BLACK){
        throw Error(`[错误] 节点的颜色 不是红色or黑色 节点的值===${node.key}`)
    }

    if(
        node.color === RED 
        && (node.left ? node.left.color === RED : false || node.right ? node.right.color === RED : false )
    ){
        // 非法
        throw Error(`[错误] 节点的颜色是非法的右有两个红色的节点： 节点的值===${node.key}`)
    }else{
        // 合法的继续 向下遍历啊 
        checkColor(node.left) 
        checkColor(node.right)
    }
}

// 检查节点 和 全部子节点的 关键值顺序是否准确
function checkSequence(node: RBTree.RBTreeNode | null){
    if(node === null) return;

    if(node.left && node.left.key < node.key ){
        checkSequence(node.left)
    }else if(node.left){
        console.error("节点和左侧子节点关键值的顺序不准确 左侧子节点的值 不小于 节点的关键值: ", node)
        throw new Error('节点和左侧子节点关键值的顺序不准确 左侧子节点的值 不小于 节点的关键值')
    }

    if(node.right && node.right.key > node.key){
        checkSequence(node.right)
    }else if(node.right){
        console.error("节点和右侧子节点关键值的顺序不准确 右侧子节点的值 不大于 节点的关键值: ", node)
        throw new Error('节点和右侧子节点关键值的顺序不准确 右侧子节点的值 不大于 节点的关键值')
    }

}



export {
    RBTreeNode,
    RBTree,
    isRBTree
}