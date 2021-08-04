
// 二叉搜索树 - 节点
class BinarySearchTreeNode {
    // 数据指针域
    data

    // 左子节点指针域
    left = null

    // 右子节点指针域
    right = null

    // 作为节点or子树 所拥有的高度
    height = 0

    constructor(data){
        this.data = data
    }
}



class BinarySearchTree {
    // 根节点
    root  

    constructor(root = null){
        this.root = root
    }

    // 添加
    add(node){
        this.root = this.addProcess(node, this.root)

        // 判断是否是平衡树
        // 通过后序遍历添加设置节点的高度
    }
    addProcess(newNode, oldNode){
        
        if(!oldNode){
            return newNode;
        }

        if(newNode.data < oldNode.data){
            oldNode.left = this.addProcess(newNode, oldNode.left)
            return oldNode;
        }

        if(newNode.data > oldNode.data){
            oldNode.right = this.addProcess(newNode, oldNode.right)
            return oldNode
        }
        console.log(newNode, oldNode)
        if(newNode.data === oldNode.data){
            console.error('不能够右重复的关键值')
        }
    }

    // 查找最小的节点
    findMinNode(){
        return this.root ? this.findMinNodeProcess(this.root) : null;
    }
    findMinNodeProcess(node){
        return node.left ? this.findMinNodeProcess(node.left) : node;
    }

    // 查找最大的节点
    findMaxNode(){
        return this.root ? this.findMaxNodeProcess(this.root) : null;    
    }

    findMaxNodeProcess(node){
        return node.right ? this.findMaxNodeProcess(node.right) : node ;
    }

    // 层序遍历
    // 从第一次开始 一层一层遍历
    layoutTraverse(){
        if(!this.root){
            return null;
        }

        this.layoutTraverseProcess(callback, this.root)
    }
    layoutTraverseProcess(callback, ...arg){
        let layoutNodes = []
        callback(...arg)
        arg.forEach(item => {
            item.left ? layoutNodes.push(item.left) : "";
            item.right ? layoutNodes.push(item.right) : "";
        })

        layoutNodes.length > 1 && this.layoutTraverseProcess(callback, ...layoutNodes) ;
    }

    // 中序遍历
    inOrderTraverse(){
        this.inOrderTraverseProcess(callback, this.root)
    }
    inOrderTraverseProcess(callback, node){
        if(!node){
            return 
        }

        this.inOrderTraverseProcess(callback, node.left)
        callback(node)
        this.inOrderTraverseProcess(callback, node.right)
    }

    // 先序遍历
    preOrderTranverse(){
        this.preOrderTranverseProcess(callback, this.root)
    }
    preOrderTranverseProcess(callback, node){
        if(!node) return;

        callback(node)
        this.preOrderTranverseProcess(callback, node.left)
        this.preOrderTranverseProcess(callback, node.right)
    }

    // 后序遍历
    postOrderTraverse(){
        this.postOrderTraverseProcess(callback, this.root)
    }
    postOrderTraverseProcess(callback, node){
        if(!node) return 
        this.postOrderTraverseProcess(callback, node.left)
        this.postOrderTraverseProcess(callback, node.right)
        callback(node)
    }

    // 删除
    remove(keyValue){
        this.root = this.removeProcess(keyValue, this.root)
    }
    removeProcess(keyValue, node){
        if(!node) return null;

        if(keyValue < node.data){
            node.left = this.removeProcess(keyValue, node.left)
            return node;
        }else if(keyValue > node.data){
            node.right = this.removeProcess(keyValue, node.right)
            return node;
        }else if(keyValue === node.data){
            if(!node.left && !node.right){
                return null
            }else if(!node.left && node.right){
                return node.right;
            }else if(node.left && !node.right){
                return node.left;
            }else if(node.left && node.right){
                const minNode = this.findMinNodeProcess(node.right)
                node.data = minNode.data;
                // 删除右侧中最小的值
                node.right = this.removeProcess(minNode.data, node.right)
                return node
            }
        }
    }

}

function callback(...arg){
    let datas = []
    arg.forEach(item => {
        datas.push(item.data)
    })

    console.log('datas: ', datas)
}

binarySearchTree = new BinarySearchTree()
// Array.from([11,7,15,5,9,13,20,3,6,8,10,12,14,18,25]).forEach(v => {
//     const node = new BinarySearchTreeNode(v)
//     binarySearchTree.add(node)
// })


Array.from([11,7,15,5,9,13,20,3,6,8,10,14,18,25]).forEach(v => {
    const node = new BinarySearchTreeNode(v)
    binarySearchTree.add(node)
})

// console.log('binarySearchTree: ', binarySearchTree)

// let minNode = binarySearchTree.findMinNode()
// console.log("minNode: ", minNode)

// let maxNode = binarySearchTree.findMaxNode()
// console.log('maxNode: ', maxNode)

// console.log('层遍历')
// binarySearchTree.layoutTraverse()
 
// console.log('中序遍历')
// binarySearchTree.inOrderTraverse()

// console.log('先序遍历')
// binarySearchTree.preOrderTranverse()

// console.log('后序遍历')
// binarySearchTree.postOrderTraverse()


console.log('层遍历')
binarySearchTree.layoutTraverse()


binarySearchTree.remove(11)

console.log('层遍历')
binarySearchTree.layoutTraverse()