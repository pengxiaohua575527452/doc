import { RBTree, isRBTree } from "./rbtree.js"
import { drawRBTree } from "./drawRBTree.js"

// 测试全部类型的插入操作
function testAllInsertOperation(){
    // 测试全部类型的插入操作
    const tree = new RBTree()
    const arr = [500,400]
    // 插入一个需要 LL 操作的节点
    arr.push(300)
    // 插入一个父节点是 4节点的 需要遍历修正颜色的节点
    arr.push(200)
    // 插入一个需要 LR 操作的节点
    arr.push(250)
    // 插入一个父节点是 4节点的 需要遍历修正颜色的节点
    arr.push(350)
    // 插入一个 需要 RR 操作的节点
    arr.push(380)
    // 插入一个父节点是 4节点的 需要遍历修正颜色的节点
    arr.push(390)
    // 插入一个 需要 RL 操作的节点
    arr.push(385)
    const len = arr.length;
    for(let i = 0;i<len; i++){
        tree.add(arr[i])
        drawRBTree(tree.root)
        try{
            isRBTree(tree)
        }catch(err){
            console.error('非法的红黑树')
            break;
        }
    }
}

// 初始化数据
let arr = []
let len = 200000;
for(let i = 0; i< len; i++){
    arr.push(i)
}

function largeScaleRandomTest(){
   const rounds = 100
   console.log('大规模测试开始')
   console.time()
   for(let i =0; i< rounds; i++){
        arr.sort(() => Math.random() - 0.5)
        // console.log(arr)
        const tree = new RBTree()
        arr.forEach(item => {
            tree.add(item)
        })

        try{
            isRBTree(tree)
        }catch(err){
            console.error('非法的红黑树: ', err)
            console.log("非法红黑树的数组参数： ", arr)
            break;
        }
   }
   console.timeEnd()
   console.log('大规模测试结束')
}

export {
    testAllInsertOperation,
    largeScaleRandomTest
}