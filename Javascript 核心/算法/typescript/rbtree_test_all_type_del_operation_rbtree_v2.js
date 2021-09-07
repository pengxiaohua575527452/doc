import { RBTree, isRBTree } from "./rbtree_v2.js"
import { drawRBTree } from "./drawRBTree.js"


// 创建一个标准的测试用红黑树
function createTree(arr = [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650]){
    const tree = new RBTree()
    // const arr = [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650]
    const len = arr.length;
    for(let i = 0;i<len; i++){
        tree.add(arr[i])
        try{
            isRBTree(tree)
        }catch(err){
            console.error('非法的红黑树')
            break;
        }
    }
    return tree
}

// 测试全部类型的删除操作
function testAllDelOperation(){
    // 测试全部类型的插入操作
    // [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650]
    let tree;

    // 删除右两个子节点的节点--------------------------------------------------
    // 数据准备
    tree = createTree([500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650]);
    drawRBTree(tree.root)
    // 删除操作
    tree.removeNode(385)
    drawRBTree(tree.root)

    // 删除 一个root节点
    tree.removeNode(350)
    drawRBTree(tree.root)

    // 删除一个红色的节点  
    tree.removeNode(383)
    drawRBTree(tree.root)
 

    // 删除3节点 --------------------------------------------------------------
    
    // 删除一个 高度是2的黑色节点 是父节点的左子节点 2-3-4 树中的3节点 左倾
    // 数据准备
    tree = createTree([500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,383,395,430,480,550,650])
    drawRBTree(tree.root)
    // 删除操作
    tree.removeNode(380)
    drawRBTree(tree.root)

    // 删除一个 高度是2的黑色节点 是父节点的左子节点 2-3-4 树中的3节点 右倾
    // 数据准备
    tree = createTree([500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,395,430,480,550,650])
    drawRBTree(tree.root)
    // 删除操作
    tree.removeNode(380)
    drawRBTree(tree.root)




    // 删除一个 高度是2的黑色节点 是父节点的右子节点 2-3-4 树中的3节点 左倾
    // 数据准备
    tree = createTree([500,400, 300, 200 ,250,350,380,390,385, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650])
    drawRBTree(tree.root)
    // 删除操作
    tree.removeNode(390)
    drawRBTree(tree.root)

    // 删除一个 高度是2的黑色节点 是父节点的右子节点 2-3-4 树中的3节点 右倾 
    // 数据准备
    [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650]
    tree = createTree(
       [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,430,480,550,650]
    )
    drawRBTree(tree.root)
    // 删除操作
    tree.removeNode(390)
    drawRBTree(tree.root)
    


    // 删除2节点-------------------------------------------------------------------
  
    // 删除一个叶子节点是黑色节点  是父节点的左子节点 2-3-4树中的2节点 没有兄弟节点 这个状况不可能出现
    // 因为如果有父节点，可以是 2节点 3节点 4节点 ，如果当前节点是黑色的,那么父节点一定是一个2节点
 
 

    // 删除一个叶子节点是黑色节点 是父节点的左子节点 2-3-4树中的2节点 有兄弟节点 红黑中的兄弟节点是红色的
    // 数据准备
    tree = createTree(
        [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,395,430,480,550,650,386]
    )
    drawRBTree(tree.root)
    // // 删除
    tree.removeNode(380)
    try{
        isRBTree(tree)
    }catch(err){
        console.error('非法的红黑树: ', err)
        console.log("非法红黑树的数组参数： ", arr)
        i = rounds;
    }
    drawRBTree(tree.root)
  
    
    // 删除一个叶子节点是黑色节点 是父节点的左子节点 2-3-4树中的2节点 有兄弟节点 红黑中的兄弟节点是黑色的 2节点 父节点是红色的
    // 数据准备
    tree = createTree(
        [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650,355]
    )
    tree.removeNode(355)
    drawRBTree(tree.root)
    // 执行删除
    tree.removeNode(360)
    try{
        isRBTree(tree)
    }catch(err){
        console.error('非法的红黑树: ', err)
        console.log("非法红黑树的数组参数： ", arr)
        i = rounds;
    }
    drawRBTree(tree.root)

    // 删除一个叶子节点是黑色节点 是父节点的左子节点 2-3-4树中的2节点 有兄弟节点 红黑中的兄弟节点是黑色的 2节点 父节点是黑色的
    // 数据准备
    tree = createTree(
        [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650,355]
    )
    tree.removeNode(355)
    tree.removeNode(383)
    tree.removeNode(360)
    tree.removeNode(387)
    tree.removeNode(395)
    drawRBTree(tree.root)
    // 删除
    tree.removeNode(380)
    try{
        isRBTree(tree)
    }catch(err){
        console.error('非法的红黑树: ', err)
        console.log("非法红黑树的数组参数： ", arr)
        i = rounds;
    }
    drawRBTree(tree.root)
    
    // 删除一个叶子节点是黑色节点 是父节点的左子节点 2-3-4树中的2节点 有兄弟节点 红黑中的兄弟节点是黑色的 3节点 左倾
    // 数据准备
    tree = createTree(
        [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650,355]
    )
    tree.removeNode(355)
    tree.add(384)
    drawRBTree(tree.root)
    // 删除
    tree.removeNode(360)
    try{
        isRBTree(tree)
    }catch(err){
        console.error('非法的红黑树: ', err)
        console.log("非法红黑树的数组参数： ", arr)
        i = rounds;
    }
    drawRBTree(tree.root)
    
    // 删除一个叶子节点是黑色节点 是父节点的左子节点 2-3-4树中的2节点 有兄弟节点 红黑中的兄弟节点是黑色的 3节点 右倾
    // 数据准备
    tree = createTree(
        [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650,355]
    )
    tree.removeNode(355)
    tree.add(382)
    drawRBTree(tree.root)
    // 删除
    tree.removeNode(360)
    try{
        isRBTree(tree)
    }catch(err){
        console.error('非法的红黑树: ', err)
        console.log("非法红黑树的数组参数： ", arr)
        i = rounds;
    }
    drawRBTree(tree.root)
    
    // 删除一个叶子节点是黑色节点 是父节点的左子节点 2-3-4树中的2节点 有兄弟节点 红黑中的兄弟节点是黑色的 4节点
    // 数据准备
    tree = createTree(
        [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650,355]
    )
    tree.removeNode(355)
    tree.add(382)
    tree.add(384)
    drawRBTree(tree.root)
    // 删除
    tree.removeNode(360)
    try{
        isRBTree(tree)
    }catch(err){
        console.error('非法的红黑树: ', err)
        console.log("非法红黑树的数组参数： ", arr)
        i = rounds;
    }
    drawRBTree(tree.root)
 

    // 删除一个叶子节点是黑色节点 是父节点的右子节点 2-3-4树中的2节点 有兄弟节点 红黑中的兄弟节点是红色的
    // 数据准备
    tree = createTree(
        [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,395,430,480,550,650,383, 382,384]
    )
    
    tree.removeNode(395)
    tree.removeNode(387)
    drawRBTree(tree.root)
    // // 删除
    tree.removeNode(390)
    try{
        isRBTree(tree)
    }catch(err){
        console.error('非法的红黑树: ', err)
        console.log("非法红黑树的数组参数： ", arr)
        i = rounds;
    }
    drawRBTree(tree.root)
 
    
    // 删除一个叶子节点是黑色节点 是父节点的右子节点 2-3-4树中的2节点 有兄弟节点 红黑树的兄弟节点是黑色的 2节点 父节点是红色的
    tree = createTree(
        [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650,355]
    )
    tree.removeNode(355)
    drawRBTree(tree.root)
    // 删除
    tree.removeNode(383)
    try{
        isRBTree(tree)
    }catch(err){
        console.error('非法的红黑树: ', err)
        console.log("非法红黑树的数组参数： ", arr)
        i = rounds;
    }
    drawRBTree(tree.root)

    // 删除一个叶子节点是黑色节点 是父节点的右子节点 2-3-4树中的2节点 有兄弟节点 红黑树的兄弟节点是黑色的 2节点 父节点是黑色的
    // 数据准备
    tree = createTree(
        [500,400, 300, 200 ,250,350,380,390,385,387, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,360,383,395,430,480,550,650,355]
    )
    tree.removeNode(355)
    tree.removeNode(383)
    tree.removeNode(360)
    tree.removeNode(387)
    tree.removeNode(395)
    drawRBTree(tree.root)
    // 删除
    tree.removeNode(390)
    try{
        isRBTree(tree)
    }catch(err){
        console.error('非法的红黑树: ', err)
        console.log("非法红黑树的数组参数： ", arr)
        i = rounds;
    }
    drawRBTree(tree.root)

    
    // 删除一个叶子节点是黑色节点 是父节点的右子节点 2-3-4树中的2节点 有兄弟节点 红黑中的兄弟节点是黑色的 3节点 左倾
    // 数据准备
    tree = createTree(
        [500,400, 300, 200 ,250,350,390,385, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,430,480,550,650,383, 384]
    )
    drawRBTree(tree.root)
    // 删除
    tree.removeNode(390)
    try{
        isRBTree(tree)
    }catch(err){
        console.error('非法的红黑树: ', err)
        console.log("非法红黑树的数组参数： ", arr)
        i = rounds;
    }
    drawRBTree(tree.root)
    
    // 删除一个叶子节点是黑色节点 是父节点的右子节点 2-3-4树中的2节点 有兄弟节点 红黑中的兄弟节点是黑色的 3节点 右倾
    // 数据准备
    tree = createTree(
        [500,400, 300, 200 ,250,350,390,385, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,430,480,550,650,383, 382]
    )
    drawRBTree(tree.root)
    // 删除
    tree.removeNode(390)
    try{
        isRBTree(tree)
    }catch(err){
        console.error('非法的红黑树: ', err)
        console.log("非法红黑树的数组参数： ", arr)
        i = rounds;
    }
    drawRBTree(tree.root)
    
    // 删除一个叶子节点是黑色节点 是父节点的右子节点 2-3-4树中的2节点 有兄弟节点 红黑中的兄弟节点是黑色的 4节点
    // 数据准备
    tree = createTree(
        [500,400, 300, 200 ,250,350,390,385, 600, 100, 220, 280, 320,450,50,150,210,230,260,270,310,330,430,480,550,650,383, 382,384]
    )
    drawRBTree(tree.root)
    // 删除
    tree.removeNode(390)
    try{
        isRBTree(tree)
    }catch(err){
        console.error('非法的红黑树: ', err)
        console.log("非法红黑树的数组参数： ", arr)
        i = rounds;
    }
    drawRBTree(tree.root)
    
}

// 初始化数据
let arr = []
let len = 5000;
for(let i = 0; i< len; i++){
    arr.push(i)
}

function largeScaleRandomTest(){
    let tree;
    const rounds = 100
    console.log('大规模测试开始')
    console.time()
    
    for(let i =0; i< rounds; i++){
        // 测试添加
        arr.sort(() => Math.random() - 0.5)
        tree = new RBTree()

        for(let j = 0; j< arr.length; j++){
            tree.add(arr[j])
            try{
                isRBTree(tree)
            }catch(err){
                console.error('添加节点 非法的红黑树: ', err)
                console.log("添加节点 非法红黑树的数组参数： ", arr)
                i = rounds;
                break;
            }
        }

        // 测试删除
        arr.sort(() => Math.random() - 0.5)
        for(let j = 0; j< arr.length; j++){
            tree.removeNode(arr[j])
            // drawRBTree(tree.root)
            try{
                isRBTree(tree)
            }catch(err){
                console.error('非法的红黑树: ', err)
                console.log("非法红黑树的数组参数： ", arr)
                i = rounds;
                break;
            }
        }
        console.log('测试完成了'+i + "次")
    }

    // 测试删除
    console.timeEnd()
    console.log('大规模测试结束: ', tree)
}

export {
    testAllDelOperation,
    largeScaleRandomTest
}

 