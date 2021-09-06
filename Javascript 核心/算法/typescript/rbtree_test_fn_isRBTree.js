// 单元测试 isRBTree 函数运行的正确性
import {RBTree, RBTreeNode } from "./rbtree.js";
import { isRBTree } from "./rbtree.js"

 

// 测试 isRBTree 函数运行的正确性
/***
 * 
 * 测试要点
 * 
 * 根节点是红色的非法红黑树
 * 
 * 黑高不相同的非法红黑树
 * 
 * 连续两个红色节点的非法红黑树
 * 
 * 左侧子节点的关键值 > 节点关键值 情况的非法红黑树
 * 左侧子节点的关键值 === 节点关键值 情况的非法红黑树
 * 
 * 
 * 右侧子节点的关键值 < 节点关键值 情况的非法红黑树
 * 右侧子节点的关键值 === 节点关键值 情况的非法红黑树
 * 
 */



 


function testFnIsRBTree(){
  
    let tree = new RBTree()
    let root = new RBTreeNode(100, null, null, null, 100)
    let node_50;
    let node_30;
    
    // 根节点是红色的非法红黑树
    tree.root = root;
    try{
        isRBTree(tree)
    }catch(err){
        console.error("成功后检查出 root 是红色的非法红黑树： ", err)
    }

    // 黑高不相同的非法红黑树
    tree = new RBTree()
    root = new RBTreeNode(100, null, null, null, 100)
    root.color = "black";

    node_50 = new RBTreeNode(50, null, null, null, 50) 
    node_50.color = "black"

    tree.root = root;
    root.left = node_50
    try{
        isRBTree(tree)
    }catch(err){
        console.error("成功后检查出 黑高不同的非法红黑树： ", err)
    }

    // 连续两个红色节点的非法红黑树
    tree = new RBTree()
    root = new RBTreeNode(100, null, null, null, 100)
    root.color = "black";

    node_50 = new RBTreeNode(50, null, null, null, 50) 
    node_30 = new RBTreeNode(30, null, null, null, 30) 

    tree.root = root;
    root.left = node_50
    node_50.left = node_30
    try{
        isRBTree(tree)
    }catch(err){
        console.error("成功后检查出 连续两个节点是红色的 非法红黑树： ", err)
    }

    

    // 左侧子节点的关键值 > 节点关键值 情况的非法红黑树
    tree = new RBTree()
    root = new RBTreeNode(100, null, null, null, 100)
    root.color = "black";

    node_50 = new RBTreeNode(150, null, null, null, 150) 
    tree.root = root;
    root.left = node_50
 
    try{
        isRBTree(tree)
    }catch(err){
        console.error("成功后检查出 左侧子节点的关键值 > 节点关键值 情况的非法红黑树 非法红黑树： ", err)
    }

    // 左侧子节点的关键值 === 节点关键值 情况的非法红黑树
    tree = new RBTree()
    root = new RBTreeNode(100, null, null, null, 100)
    root.color = "black";

    node_50 = new RBTreeNode(100, null, null, null, 100) 
    tree.root = root;
    root.left = node_50
    try{
        isRBTree(tree)
    }catch(err){
        console.error("成功后检查出 左侧子节点的关键值 === 节点关键值 情况的非法红黑树 非法红黑树： ", err)
    }
     
   
    // 右侧子节点的关键值 < 节点关键值 情况的非法红黑树
    tree = new RBTree()
    root = new RBTreeNode(100, null, null, null, 100)
    root.color = "black";

    node_50 = new RBTreeNode(50, null, null, null, 50) 
   

    tree.root = root;
    root.right = node_50
  
    try{
        isRBTree(tree)
    }catch(err){
        console.error("成功后检查出 右侧子节点的关键值 < 节点关键值 情况的非法红黑树 非法红黑树： ", err)
    }

    // 右侧子节点的关键值 === 节点关键值 情况的非法红黑树
    tree = new RBTree()
    root = new RBTreeNode(100, null, null, null, 100)
    root.color = "black";

    node_50 = new RBTreeNode(100, null, null, null, 100) 

    tree.root = root;
    root.right = node_50
  
    try{
        isRBTree(tree)
    }catch(err){
        console.error("成功后检查出 右侧子节点的关键值 === 节点关键值 情况的非法红黑树 非法红黑树： ", err)
    }
   

}


export {
    testFnIsRBTree
}